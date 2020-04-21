import { Component, OnInit } from '@angular/core';
import { HeaderTweakService } from 'src/app/modules/core/services/header-tweak.service';
import { Observable } from 'rxjs';
import { FileKind, DetailKind } from 'src/app/modules/shared/models/Files';
import { FileListService } from 'src/app/modules/core/services/file-list.service';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { shareReplay, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.scss']
})
export class SeriesComponent implements OnInit {

  seriesDetails$: Observable<DetailKind>;
  seriesEpisodes$: Observable<FileKind>;

  constructor(private fileListService: FileListService,
    private route: ActivatedRoute,
    private headerTweakService: HeaderTweakService
  ) { }


  ngOnInit() {
    this.headerTweakService.setCompact();
    const urlChange$ = this.route.url.pipe(shareReplay());
    this.seriesDetails$ = urlChange$.pipe(
      map((e: UrlSegment[]) => this.getPlace(e)),
      switchMap((rel: string) => this.fileListService.getFileDetail(rel))
    );
  }

  private getPlace(segments: UrlSegment[]): string {
    return '/' + segments.map(segment => decodeURIComponent(segment.toString())).join('/');
  }
}
