import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable, of, timer } from 'rxjs';
import ServerLoad from 'src/app/modules/shared/models/ServerLoad';
import { environment } from 'src/environments/environment';
import { ServerAdminService } from 'src/app/modules/core/services/server-admin.service';
import ServerInfo from 'src/app/modules/shared/models/ServerInfo';
import { LogMessage } from 'src/app/modules/shared/models/LogMessage';
import { catchError, map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { fakeLogs } from './fake-logs';
import { HeaderTweakService } from 'src/app/modules/core/services/header-tweak.service';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss']
})
export class MaintenanceComponent implements OnInit {
  apiUrl: string = `${environment.api}${environment.apiPrefix}`;
  agentUrl: string = environment.agent;

  public serverLoad$: Observable<ServerLoad>;
  public serverInfo$: Observable<ServerInfo>;
  public serverConsole$: Observable<LogMessage>;

  public notAdmin: Boolean = false;

  constructor(private serverAdminService: ServerAdminService,
    private headerTweakService: HeaderTweakService) { }

  ngOnInit() {
    this.headerTweakService.setCompact();
    this.serverLoad$ = this.serverAdminService.getServerLoadStream().pipe(
      catchError(e => this.handleUnauthorized(e)));
    this.serverInfo$ = this.serverAdminService.getServerInfo().pipe(
      catchError(e => this.handleUnauthorized(e)));
    this.serverConsole$ = this.serverAdminService.getConsoleStream().pipe(
      catchError(e => this.handleUnauthorized(e)));
  }

  private swapFakeDataStreams() {
    const mainTimer = timer(0, 1000);
    this.serverLoad$ = mainTimer.pipe(
      map(() => {
        const r = Math.floor(Math.random() * Math.floor(6));
        return {
          max: 6,
          size: 6,
          available: r % 6,
          waiting: 6 - (r % 6)
        };
      })
    );

    this.serverInfo$ = of({
      version: '1.7',
      port: 1337,
      apiPrefix: '/api/not/real'
    });

    const dateOptions = {hour: 'numeric', minute:'numeric', second: 'numeric'};
    this.serverConsole$ = mainTimer.pipe(
      map(t => {
        const i = t % fakeLogs.length;
        return {
          ...fakeLogs[i],
          timestamp: (new Date()).toLocaleDateString('en-US', dateOptions)
        };
      })
    );
  }

  private handleUnauthorized(e: HttpErrorResponse): Observable<any> {
    if (e.status === 403 || e.status === 401) {
      // this person is not an admin
      this.notAdmin = true;
      this.swapFakeDataStreams();
    }
    return EMPTY;
  }
}
