import { Component, Input, OnChanges, HostListener, OnDestroy } from '@angular/core';
import { Video, FileKind } from 'src/app/modules/shared/models/Files';
import { API_ROUTES } from 'src/app/modules/core/routes';
import { Subject, of, Observable, Subscription, timer } from 'rxjs';
import { tap, takeUntil, delay, switchMap, map } from 'rxjs/operators';
import { AgentService } from 'src/app/modules/core/services/agent.service';
import { isVideo } from 'src/app/utils/fileTypeUtils';
import { PendingResourceRetrievalService } from 'src/app/modules/core/services/pending-resource-retrieval.service';
import { FileListService } from 'src/app/modules/core/services/file-list.service';

@Component({
  selector: 'app-video-preview',
  templateUrl: './video-preview.component.html',
  styleUrls: ['./video-preview.component.scss']
})
export class VideoPreviewComponent implements OnChanges, OnDestroy {
  @Input() video: FileKind;
  
  nextIndex: number = 1;
  index: number = 0;
  fading: boolean;

  isVideo: boolean = false;
  fullyLoaded: boolean = false;

  thumbnailUrls: Array<string>;
  animateThumbnails: boolean = false;
  stopAnimating: Subject<boolean> = new Subject<boolean>();

  subs: Array<Subscription> = [];

  constructor(private agentService: AgentService,
    private pendingService: PendingResourceRetrievalService,
    private fileListService: FileListService) { }

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

  populateVideoValues(): boolean {
    if (isVideo(this.video)) {
      this.thumbnailUrls = this.video.thumbnail.map(
        (thumbId: string) => (`${API_ROUTES.IMG_THUMBNAIL}/${thumbId}`));
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
  rotateThumbnails():void {
    timer(0, 2000).pipe(
      takeUntil(this.stopAnimating),
      switchMap(() => this.moveIndices()),
    ).subscribe();
  }

  moveIndices(): Observable<any> {
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
  private onHover(isHovered: boolean) {
    this.animateThumbnails = isHovered;
    if (this.animateThumbnails) {
      this.rotateThumbnails();
    }
    else {
      this.stopAnimating.next(true);
    }
  }
 
  playFile() {
    this.agentService.triggerPlay(this.video.rel).subscribe((res: boolean) => {
      if (res) {
        console.log(`successly triggered play for ${this.video.rel}`);
      }
    });
  }
}
