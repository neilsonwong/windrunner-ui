import { Component, OnDestroy, OnInit } from '@angular/core';
import { FileListService } from 'src/app/modules/core/services/file-list.service';
import { Observable, timer } from 'rxjs';
import ServerLoad from 'src/app/modules/shared/models/ServerLoad';
import { map, switchMap, takeWhile, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from 'src/app/modules/core/services/local-storage.service';
import { ServerAdminService } from 'src/app/modules/core/services/server-admin.service';
import ServerInfo from 'src/app/modules/shared/models/ServerInfo';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss']
})
export class MaintenanceComponent implements OnInit, OnDestroy {
  apiUrl: string = `${environment.api}${environment.apiPrefix}`;
  agentUrl: string = environment.agent;

  serverLoad$: Observable<ServerLoad>;
  serverInfo$: Observable<ServerInfo>;
  serverConsole$: Observable<String>;

  constructor(private fileListService: FileListService,
    private serverAdminService: ServerAdminService,
    private localStorageService: LocalStorageService) { }

  ngOnInit() {
    //TODO: fix oboe library unsubscribe
    this.serverLoad$ = this.serverAdminService.getServerLoadStream();
    this.serverInfo$ = this.serverAdminService.getServerInfo();
    this.serverConsole$ = this.serverAdminService.getConsoleStream();
  }

  pruneThumbnails() {
    this.fileListService.pruneThumbnails().subscribe();
  }

  clearLocalStorage() {
    this.localStorageService.clear();
  }

  ngOnDestroy(): void {
    console.log('destroyed')
  }
}
