import { Component, Input, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/modules/core/services/local-storage.service';
import { ServerAdminService } from 'src/app/modules/core/services/server-admin.service';

@Component({
  selector: 'app-tool-box',
  templateUrl: './tool-box.component.html',
  styleUrls: ['./tool-box.component.scss']
})
export class ToolBoxComponent implements OnInit {
  @Input() disabled: Boolean;

  constructor(
    private serverAdminService: ServerAdminService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit() {
  }

  pruneThumbnails() {
    this.serverAdminService.pruneThumbnails().subscribe();
  }

  clearLocalStorage() {
    this.localStorageService.clear();
  }
}
