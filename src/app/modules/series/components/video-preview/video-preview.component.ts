import { Component, Input, OnChanges, HostListener, OnDestroy, ElementRef, OnInit } from '@angular/core';
import { Video, FileKind } from 'src/app/modules/shared/models/Files';
import { API_ROUTE_OPTIONS } from 'src/app/modules/core/routes';
import { Subject, of, Observable, Subscription, timer, EMPTY } from 'rxjs';
import { tap, takeUntil, delay, switchMap, map, filter, take } from 'rxjs/operators';
import { AgentService } from 'src/app/modules/core/services/agent.service';
import { isVideo } from 'src/app/utils/fileTypeUtils';
import { PendingResourceRetrievalService } from 'src/app/modules/core/services/pending-resource-retrieval.service';
import { FileListService } from 'src/app/modules/core/services/file-list.service';
import { VisibilityService } from 'src/app/modules/core/services/visibility.service';
import { VariableRoutingService } from 'src/app/modules/core/services/variable-routing.service';
import { WebPlayerService } from 'src/app/modules/core/services/web-player.service';

@Component({
  selector: 'app-video-preview',
  templateUrl: './video-preview.component.html',
  styleUrls: ['./video-preview.component.scss']
})
export class VideoPreviewComponent implements OnInit, OnChanges, OnDestroy {
  @Input() video: FileKind;

  nextIndex: number = 1;
  index: number = 0;
  fading: boolean;

  isVideo: boolean = false;
  fullyLoaded: boolean = false;

  thumbnailUrls: Array<string>;
  animateThumbnails: boolean = false;
  stopAnimating: Subject<boolean> = new Subject<boolean>();

  visibility$: Observable<boolean>;
  isVisible$: Observable<boolean>;
  notVisible$: Observable<boolean>;

  subs: Array<Subscription> = [];

  constructor(
    private agentService: AgentService,
    private visibilityService: VisibilityService,
    private pendingService: PendingResourceRetrievalService,
    private elRef: ElementRef,
    private fileListService: FileListService,
    private variableRoutingService: VariableRoutingService,
    private webPlayerService: WebPlayerService) { }

  ngOnInit(): void {
    this.setupRandomRotation();
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub: Subscription) => {
      sub.unsubscribe();
    });
  }

  ngOnChanges() {
    this.populateVideoValues();
    if (!this.fullyLoaded) {
      this.subs.push(
        this.pendingService.waitForPromised<Video>(this.video.promised, this.getDetails$())
          .pipe(tap((updated: Video) => this.handleUpdatedValue(updated))).subscribe()
      );
    }
  }

  setupRandomRotation() {
    this.visibility$ = this.visibilityService.elementInSight(this.elRef);
    this.isVisible$ = this.visibility$.pipe(filter(e => e));
    this.notVisible$ = this.visibility$.pipe(filter(e => e === false));
    this.subs.push(
      this.isVisible$.pipe(
        tap(() => this.randomRotation())
      ).subscribe()
    );
  }

  randomRotation() {
    const randomDelay = Math.random() * 60000;
    this.subs.push(
      timer(randomDelay, 60000).pipe(
        takeUntil(this.notVisible$),
        switchMap(() => this.rotateThumbnails())
      ).subscribe()
    );
  }

  populateVideoValues(): boolean {
    if (isVideo(this.video)) {
      this.thumbnailUrls = this.video.thumbnail.map((thumbId: string) => 
        (`${this.variableRoutingService.resolveRoute(API_ROUTE_OPTIONS.IMG_THUMBNAIL)}/${thumbId}`));
      this.isVideo = true;
      this.fullyLoaded = (this.video.promised === undefined);
      return true;
    }
    return false;
  }

  protected getDetails$(): Observable<Video> {
    return this.fileListService.getFileDetail(this.video.rel)
      .pipe(map(result => (
        (isVideo(result)) ?
          result :
          null
      )));
  }

  protected handleUpdatedValue(updated: Video): void {
    if (updated !== null) {
      this.video = updated;
      this.ngOnChanges();
    }
  }

  // super lazy way and NEEDS fast internet lol
  tryRotateThumbnails(): void {
    timer(0, 2000).pipe(
      takeUntil(this.stopAnimating),
      switchMap(() => this.rotateThumbnails()),
    ).subscribe();
  }

  rotateThumbnails(): Observable<any> {
    return of('').pipe(
      tap(() => {
        // start fading
        this.fading = true;
      }),
      delay(750),
      tap(() => {
        // update the indices
        this.index = this.nextIndex;
      }),
      delay(100),
      tap(() => {
        this.fading = false
      }),
      delay(100),
      tap(() => {
        // stagger it slightly
        this.nextIndex = (this.nextIndex + 1) % this.thumbnailUrls.length;
      }));
  }

  @HostListener('hoverChange', ['$event'])
  onHover(isHovered: boolean) {
    this.animateThumbnails = isHovered;

    if (this.animateThumbnails) {
      this.tryRotateThumbnails();
    }
    else {
      this.stopAnimating.next(true);
    }
  }

  playFile(videoFile: Video) {
    this.agentService.heartbeat$.pipe(
      take(1),
      switchMap(isAlive => {
        if (isAlive) {
          return this.agentService.triggerPlay(videoFile.rel).pipe(
            tap((res: boolean) => {
              if (res) {
                console.log(`successly triggered play for ${videoFile.rel}`);
              }
            }));
        }
        else {
          this.webPlayerService.playVideo(videoFile);
          return EMPTY;
        }
      })
    ).subscribe()
  }

  _isVideo(file: FileKind): file is Video {
      return isVideo(file);
  }
}
