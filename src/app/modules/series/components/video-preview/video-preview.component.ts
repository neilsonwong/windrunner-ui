import { Component, Input, OnChanges, HostListener } from '@angular/core';
import { Video } from 'src/app/modules/shared/models/Files';
import { API_ROUTES } from 'src/app/modules/core/routes';
import { interval, Subject, of, Observable } from 'rxjs';
import { tap, takeUntil, delay, switchMap } from 'rxjs/operators';
import { AgentService } from 'src/app/modules/core/services/agent.service';

@Component({
  selector: 'app-video-preview',
  templateUrl: './video-preview.component.html',
  styleUrls: ['./video-preview.component.scss']
})
export class VideoPreviewComponent implements OnChanges {
  @Input() video: Video;
  
  nextIndex: number = 1;
  index: number = 0;
  fading: boolean;

  thumbnailUrls: Array<string>;
  animateThumbnails: boolean = false;

  stopAnimating: Subject<boolean> = new Subject<boolean>();

  constructor(private agentService: AgentService) { }

  ngOnChanges() {
    this.thumbnailUrls = this.video.thumbnail.map(
      (thumbId: string) => (`${API_ROUTES.IMG_THUMBNAIL}/${thumbId}`));
  }

  // super lazy way and NEEDS fast internet lol
  rotateThumbnails():void {
    interval(2000).pipe(
      takeUntil(this.stopAnimating),
      switchMap(() => this.moveIndices()),
    ).subscribe();
  }

  moveIndices(): Observable<any> {
    // start fading
    this.fading = true;

    return of('').pipe(
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
