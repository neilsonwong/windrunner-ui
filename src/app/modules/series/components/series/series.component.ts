import { Component, OnInit } from '@angular/core';
import { HeaderTweakService } from 'src/app/modules/core/services/header-tweak.service';
import { Observable } from 'rxjs';
import { FileKind, DetailKind, SeriesDirectory } from 'src/app/modules/shared/models/Files';
import { FileListService } from 'src/app/modules/core/services/file-list.service';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { shareReplay, map, switchMap, tap, share, take } from 'rxjs/operators';
import { SeriesOptions } from 'src/app/modules/shared/models/SeriesOptions';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.scss']
})
export class SeriesComponent implements OnInit {

  isFavourite$: Observable<boolean>;
  seriesDetails$: Observable<DetailKind>;
  seriesEpisodes$: Observable<FileKind>;
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
      switchMap((rel: string) => this.fileListService.getIsFavourite(rel)),
      map(e => e.result)
    );

    this.optionsList$ = filePath$.pipe(
      switchMap((rel: string) => this.fileListService.getSeriesOptions(rel)),
      // clever manipulation
      shareReplay()
    );
  }

  private getPlace(segments: UrlSegment[]): string {
    return '/' + segments.map(segment => decodeURIComponent(segment.toString())).join('/');
  }

  updateFavouriteStatus(isFav: boolean) {
    this.fileListService.setFavourite(this.seriesPath, isFav).subscribe();
  }

  updateSeriesOption(newAniListId: number) {
    this.seriesDetails$ = this.fileListService.updateSeriesOption(this.seriesPath, newAniListId);
    this.seriesDetails$.subscribe();
  }
}
