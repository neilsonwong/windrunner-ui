import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DirectoryKind } from 'src/app/modules/shared/models/Files';
import { FileListService } from 'src/app/modules/core/services/file-list.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-highlight',
  templateUrl: './highlight.component.html',
  styleUrls: ['./highlight.component.scss']
})
export class HighlightComponent implements OnInit {

  recentlyUpdatedSeries$: Observable<DirectoryKind[]>;
  favouriteSeries$: Observable<DirectoryKind[]>;

  constructor(private fileListService: FileListService) { }

  ngOnInit() {
    this.recentlyUpdatedSeries$ = this.fileListService.getRecent();
    this.favouriteSeries$ = this.fileListService.getFavourites();
  }
}
