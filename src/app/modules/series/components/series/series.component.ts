import { Component, OnInit } from '@angular/core';
import { HeaderTweakService } from 'src/app/modules/core/services/header-tweak.service';
import { Observable } from 'rxjs';
import { FileKind, DetailKind } from 'src/app/modules/shared/models/Files';
import { FileListService } from 'src/app/modules/core/services/file-list.service';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { shareReplay, map, switchMap, tap } from 'rxjs/operators';
import { SeriesOptions } from 'src/app/modules/shared/models/SeriesOptions';
import VIDEO_LISTS from 'src/app/modules/shared/models/VideoLists.enum';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.scss']
})
export class SeriesComponent implements OnInit {

  isFavourite$: Observable<boolean>;
  isRecommend$: Observable<boolean>;
  seriesDetails$: Observable<DetailKind>;
  seriesVideos$: Observable<FileKind[]>;
  optionsList$: Observable<SeriesOptions>;
  seriesPath: string;

  constructor(private fileListService: FileListService,
    private route: ActivatedRoute,
    private headerTweakService: HeaderTweakService
  ) { }


  ngOnInit() {
    this.headerTweakService.setCompact();

    const urlChange$ = this.route.url.pipe(shareReplay());
    const filePath$ = urlChange$.pipe(
      map((e: UrlSegment[]) => this.getPlace(e)),
      tap((e: string) => { this.seriesPath = e; }),
      shareReplay()
    );

    this.seriesDetails$ = filePath$.pipe(
      switchMap((rel: string) => this.fileListService.getFileDetail(rel))
    );

    this.isFavourite$ = filePath$.pipe(
      switchMap((rel: string) => this.fileListService.getInList(VIDEO_LISTS.FAV, rel)),
      map(e => e.result)
    );

    this.isRecommend$ = filePath$.pipe(
      switchMap((rel: string) => this.fileListService.getInList(VIDEO_LISTS.REC, rel)),
      map(e => e.result)
    );

    this.optionsList$ = filePath$.pipe(
      switchMap((rel: string) => this.fileListService.getSeriesOptions(rel)),
      // clever manipulation
      shareReplay()
    );

    this.seriesVideos$ = filePath$.pipe(
      switchMap((rel: string) => this.fileListService.getDirectoryListing(rel)),
      map((files: FileKind[]) => {
        const isVideoRegExp = new RegExp(/(\.(avi|mkv|ogm|mp4|flv|ogg|wmv|rm|mpeg|mpg)$)/);
        return files.filter((file: FileKind) => (isVideoRegExp.test(file.name)));
      })
    );
  }

  private getPlace(segments: UrlSegment[]): string {
    return '/' + segments.map(segment => decodeURIComponent(segment.toString())).join('/');
  }

  updateFavouriteStatus(isFav: boolean) {
    this.fileListService.toggleListItem(VIDEO_LISTS.FAV, this.seriesPath, isFav).subscribe();
  }

  updateRecommendStatus(isRecommended: boolean) {
    this.fileListService.toggleListItem(VIDEO_LISTS.REC, this.seriesPath, isRecommended).subscribe();
  }

  updateSeriesOption(newAniListId: number) {
    this.seriesDetails$ = this.fileListService.updateSeriesOption(this.seriesPath, newAniListId);
    this.seriesDetails$.subscribe();
  }
}
