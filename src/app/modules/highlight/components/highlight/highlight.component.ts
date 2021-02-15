import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DirectoryKind } from 'src/app/modules/shared/models/Files';
import { FileListService } from 'src/app/modules/core/services/file-list.service';
import VIDEO_LISTS from 'src/app/modules/shared/models/VideoLists.enum';
import { RecentlyChangedData } from 'src/app/modules/shared/models/GenericData';
import { map, switchMap, tap } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { APP_TITLE } from 'src/app/modules/shared/constants';
import { AuthService } from 'src/app/modules/core/services/auth.service';

@Component({
  selector: 'app-highlight',
  templateUrl: './highlight.component.html',
  styleUrls: ['./highlight.component.scss']
})
export class HighlightComponent implements OnInit {

  recentlyUpdatedSeries$: Observable<DirectoryKind[]>;
  favouriteSeries$: Observable<DirectoryKind[]>;

  constructor(
    private titleService: Title,
    private fileListService: FileListService,
    private authService: AuthService
    ) { }

  ngOnInit() {
    this.titleService.setTitle(`${APP_TITLE}`)
    this.recentlyUpdatedSeries$ = this.fileListService.getRecent().pipe(
      map((changed: RecentlyChangedData) => changed.changed));

    this.favouriteSeries$ = this.authService.authContext$.pipe(
      switchMap(() => this.fileListService.getList(VIDEO_LISTS.FAV)));
  }
}
