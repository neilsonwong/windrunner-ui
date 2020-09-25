import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { first, map, switchMap, take, tap } from 'rxjs/operators';
import { UI_ROUTES } from 'src/app/modules/core/routes';
import { HeaderTweakService } from 'src/app/modules/core/services/header-tweak.service';
import { WebPlayerService } from 'src/app/modules/core/services/web-player.service';
import { Video } from 'src/app/modules/shared/models/Files';
import StreamSource from 'src/app/modules/shared/models/StreamSource';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  public video$: Observable<Video>;
  public streamSource$: Observable<StreamSource>;
  public seriesLink$: Observable<string>;
  public relatedVideos$: Observable<{next: string, prev: string}>;

  private next$: Observable<string>;
  private prev$: Observable<string>;

  constructor(
    private route: ActivatedRoute,
    private webPlayerService: WebPlayerService,
    private headerTweakService: HeaderTweakService,
    private location: Location
    ) { }

  ngOnInit() {
    this.headerTweakService.setCompact();
    this.headerTweakService.resetTransparent();

    this.video$ = this.webPlayerService.nowPlaying$;
    this.streamSource$ = this.webPlayerService.source$;
    this.seriesLink$ = this.webPlayerService.sourceFolder$.pipe(
      map(rel => `${UI_ROUTES.SERIES}${rel}`)
    );
    this.relatedVideos$ = this.webPlayerService.relatedVideos$
    this.next$ = this.relatedStream('next');
    this.prev$ = this.relatedStream('prev');

    this.route.paramMap.pipe(
      map(params => params.get('fileId')),
      tap(fileId => this.webPlayerService.setupStream(fileId))
   ).subscribe();
  }

  private relatedStream(relatedName: string) {
    return this.relatedVideos$.pipe(
      take(1),
      map(e => e[relatedName]),
      tap(fileId => this.playFile(fileId))
    );
  }

  private playFile(fileId: string) {
    if (fileId) {
      this.webPlayerService.playVideo(fileId);
    }
    else {
      console.log('no more videos')
    }
  }

  public playNext() {
    this.next$.subscribe();
  }

  public playPrev() {
    this.prev$.subscribe();
  }
}
