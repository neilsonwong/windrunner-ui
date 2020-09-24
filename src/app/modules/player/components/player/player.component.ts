import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first, map, switchMap, tap } from 'rxjs/operators';
import { HeaderTweakService } from 'src/app/modules/core/services/header-tweak.service';
import { WebPlayerService } from 'src/app/modules/core/services/web-player.service';
import { Video } from 'src/app/modules/shared/models/Files';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  public video: Video;
  public streamSrc: string;
  public subtitleSrc: string;

  constructor(
    private route: ActivatedRoute,
    private webPlayerService: WebPlayerService,
    private headerTweakService: HeaderTweakService,
    private location: Location
    ) { }

  ngOnInit() {
    this.headerTweakService.setCompact();

    // setup player and load info based on url param!
    if (!this.webPlayerService.nowPlaying) {
      this.loadPlayerBasedOnParamFileId();
    }
    else {
      this.setupSources();
    }
  }

  private loadPlayerBasedOnParamFileId() {
    this.route.paramMap.pipe(
      map(params => params.get('fileId')),
      first(),
      tap(fileId => {
        this.webPlayerService.setSources(fileId);
        this.setupSources();
      }),
      switchMap(fileId => this.webPlayerService.loadVideoData(fileId)),
      tap(() => {
        this.video = this.webPlayerService.nowPlaying;
        console.log(this.video);
      })
    ).subscribe();
  }

  private setupSources() {
    this.video = this.webPlayerService.nowPlaying;
    this.streamSrc = this.webPlayerService.streamSource;
    this.subtitleSrc = this.webPlayerService.subSource;
  }

  public goBack() {
    this.location.back();
  }
}
