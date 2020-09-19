import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import ServerLoad from 'src/app/modules/shared/models/ServerLoad';
import { environment } from 'src/environments/environment';
import { ServerAdminService } from 'src/app/modules/core/services/server-admin.service';
import ServerInfo from 'src/app/modules/shared/models/ServerInfo';
import { LogMessage } from 'src/app/modules/shared/models/LogMessage';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss']
})
export class MaintenanceComponent implements OnInit {
  apiUrl: string = `${environment.api}${environment.apiPrefix}`;
  agentUrl: string = environment.agent;

  serverLoad$: Observable<ServerLoad>;
  serverInfo$: Observable<ServerInfo>;
  serverConsole$: Observable<LogMessage>;

  constructor(private serverAdminService: ServerAdminService) { }

  ngOnInit() {
    this.serverLoad$ = this.serverAdminService.getServerLoadStream();
    this.serverInfo$ = this.serverAdminService.getServerInfo();
    this.serverConsole$ = this.serverAdminService.getConsoleStream();
  }
}
