import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DirectoryKind } from 'src/app/modules/shared/models/Files';
import { FileListService } from 'src/app/modules/core/services/file-list.service';

@Component({
  selector: 'app-recent-list',
  templateUrl: './recent-list.component.html',
  styleUrls: ['./recent-list.component.scss']
})
export class RecentListComponent implements OnInit {

  recentlyUpdatedSeries$: Observable<DirectoryKind[]>;

  constructor(
    private fileListService: FileListService
  ) { }

  ngOnInit() {
    this.recentlyUpdatedSeries$ = this.fileListService.getRecent();
  }

}
