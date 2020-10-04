import { Component, OnInit } from '@angular/core';
import { FileListService } from 'src/app/modules/core/services/file-list.service';
import { Observable } from 'rxjs';
import { DirectoryKind } from 'src/app/modules/shared/models/Files';
import VIDEO_LISTS from 'src/app/modules/shared/models/VideoLists.enum';
import { Title } from '@angular/platform-browser';
import { APP_TITLE } from 'src/app/modules/shared/constants';

@Component({
  selector: 'app-recommended',
  templateUrl: './recommended.component.html',
  styleUrls: ['./recommended.component.scss']
})
export class RecommendedComponent implements OnInit {

  recommended$: Observable<DirectoryKind[]>;

  constructor(private titleService: Title,
    private fileListService: FileListService) { }

  ngOnInit() {
    this.titleService.setTitle(`お勧め - ${APP_TITLE}`);
    this.recommended$ = this.fileListService.getList(VIDEO_LISTS.REC);
  }
}
