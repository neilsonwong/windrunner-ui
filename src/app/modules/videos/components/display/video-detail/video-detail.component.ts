import { Component, OnInit, Input } from '@angular/core';
import { FileData } from 'src/app/models/FileData';
import { ThumbnailService } from 'src/app/services/thumbnail.service';
import { AgentService } from 'src/app/services/agent.service';
import { UserPrefService } from 'src/app/services/user-pref.service';
import { Router } from '@angular/router';
import { flatMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.scss']
})
export class VideoDetailComponent implements OnInit {
  @Input() video: FileData;
  prettyName: string;
  prettySize: string;
  prettyDate: string;
  currentThumbnail: string;
  loadingThumbnail: boolean;
  noThumbStyle: string;
  watchedStyle: { [klass: string]: any; }

  private thumbnailList: string[];
  private thumbIndex: number;

  constructor(private thumbnailService: ThumbnailService,
    private userPrefsService: UserPrefService,
    private agentService: AgentService,
    private router: Router) { }

  ngOnInit() {
    this.thumbIndex = -1;
    this.loadingThumbnail = true;
    this.watchedStyle = {};

    this.prettyName = this.getPrettyName(this.video.name);
    this.prettySize = this.formatBytes(this.video.size, undefined);
    this.prettyDate = this.video.birthTime.substring(0, 10);

    this.setNoThumbStyle();
    this.setWatchTime();
    this.getThumbnails();
  }

  private getThumbnails() {
    this.thumbnailService.getThumbnailList(this.video.id)
      .subscribe((data: string[]) => {
        // set data if it's not empty
        if (data.length > 0) {
          this.thumbnailList = data;

          // if init the thumbnail on the page, only on the first time
          if (this.loadingThumbnail) {
            this.nextThumbnail();
          }
        }
      });
  }

  private nextThumbnail() {
    const curThumbIndex = ++this.thumbIndex % this.thumbnailList.length;
    // get the thumbnail to preload it before setting
    // this.thumbnailService.getThumbnail(this.video.id, this.thumbnailList[curThumbIndex])
    //   .subscribe((e) => {
        this.currentThumbnail = this.thumbnailService.getThumbnailUrl(this.video.id, this.thumbnailList[curThumbIndex]);
        this.loadingThumbnail = false;
      // });
  }

  private setNoThumbStyle() {
    if (!this.noThumbStyle) {
      this.noThumbStyle = `no-thumb-deg-${Math.floor(Math.random()*18)}`;
    }
  }

  private getPrettyName(name) {
    return name.replace(/_/g, ' ').replace(/(\[[a-zA-Z0-9\- ~,\.\-&]+\]|\([a-zA-Z0-9\- ~,\.]+\))/g, '').replace(/(\.[avimk4]+$)/g, '').trim();
  }


  private setWatchTime() {
    if (this.video.metadata &&
      this.video.metadata.watchTime !== undefined &&
      this.video.metadata.totalTime !== undefined) {
        const percentLen = Math.min(100, (this.video.metadata.watchTime / this.video.metadata.totalTime) * 100);
        this.watchedStyle = {width: `${percentLen}%`};
      }
  }

  playFile() {
    // TODO: convert this to pipe
    this.agentService.triggerPlay(this.video.rel)
      .pipe(
        flatMap((playOK) => {
          return (playOK ? this.userPrefsService.notifyPlay(this.video.id)
            : EMPTY);
          })
      ).subscribe();
  }

  jumpToFolder() {
    // TODO: find better way to do this later
    const parentFolder = this.video.rel.substring(1, this.video.rel.length - this.video.name.length);
    this.router.navigate([`/v/browse/${parentFolder}`]);
  }

  private formatBytes(a,b) {
    if(0===a)return"0 Bytes";
    const c=1024,d=b||2,e=["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"],f=Math.floor(Math.log(a)/Math.log(c));return parseFloat((a/Math.pow(c,f)).toFixed(d))+" "+e[f]
  }
}
