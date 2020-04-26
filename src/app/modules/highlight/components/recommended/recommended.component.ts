import { Component, OnInit } from '@angular/core';
import { FileListService } from 'src/app/modules/core/services/file-list.service';
import { Observable } from 'rxjs';
import { DirectoryKind } from 'src/app/modules/shared/models/Files';
import VIDEO_LISTS from 'src/app/modules/shared/models/videoLists.enum';

@Component({
  selector: 'app-recommended',
  templateUrl: './recommended.component.html',
  styleUrls: ['./recommended.component.scss']
})
export class RecommendedComponent implements OnInit {

  recommended$: Observable<DirectoryKind[]>;

  constructor(private fileListService: FileListService) { }

  ngOnInit() {
    this.recommended$ = this.fileListService.getList(VIDEO_LISTS.REC);
  }

}
