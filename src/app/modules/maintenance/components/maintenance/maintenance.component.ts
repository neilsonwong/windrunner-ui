import { Component, OnInit } from '@angular/core';
import { FileListService } from 'src/app/modules/core/services/file-list.service';
import { Observable, timer } from 'rxjs';
import ServerLoad from 'src/app/modules/shared/models/ServerLoad';
import { switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from 'src/app/modules/core/services/local-storage.service';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss']
})
export class MaintenanceComponent implements OnInit {
  apiUrl: string = `${environment.api}${environment.apiPrefix}`;
  agentUrl: string = environment.agent;

  serverLoad$: Observable<ServerLoad>;
  constructor(private fileListService: FileListService,
    private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.serverLoad$ = timer(0, 2000).pipe(
      switchMap(() => this.fileListService.getServerLoad())
    );
  }

  pruneThumbnails() {
    this.fileListService.pruneThumbnails().subscribe();
  }

  clearLocalStorage() {
    this.localStorageService.clear();
  }
}
