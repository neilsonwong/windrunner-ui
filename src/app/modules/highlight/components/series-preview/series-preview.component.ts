import { Component, OnInit, Input, HostBinding, Output, EventEmitter, HostListener } from '@angular/core';
import { DirectoryKind, FILETYPES, SeriesDirectory } from 'src/app/modules/shared/models/Files';
import { isSeries } from 'src/app/utils/fileTypeUtils';
import { environment } from 'src/environments/environment';
import { timer } from 'rxjs';
import { BannerService } from 'src/app/modules/core/services/banner.service';

const api = environment.api;

@Component({
  selector: 'app-series-preview',
  templateUrl: './series-preview.component.html',
  styleUrls: ['./series-preview.component.scss']
})
export class SeriesPreviewComponent implements OnInit {
  @Input() series: DirectoryKind;

  @HostBinding('class.series') get isSeries() {
    return this.identified;
  }

  private mouseHere: boolean;

  identified: boolean;
  coverImage: string;
  bannerImage: string;
  sourceMedia: string;
  episodeCount: string = null;
  seriesLink: string;

  constructor(private bannerService: BannerService) { }

  ngOnInit() {
    if (isSeries(this.series)) {
      this.identified = true;
      this.coverImage = this.resolveImage(this.series.aniListData.localCoverImage, this.series.aniListData.coverImage);
      this.bannerImage = this.resolveImage(this.series.aniListData.localBannerImage, this.series.aniListData.bannerImage);
      this.sourceMedia = this.resolveSource(this.series.aniListData.source);
      this.episodeCount = this.resolveEpisodeCount(this.series.aniListData.episodes, this.series.aniListData.nextAiringEpisode);
    }
    else {
      // this is a normal dir
    }

    // everybody needs a link!
    this.seriesLink = `/v/browse${this.series.rel}`;
  }

  private resolveEpisodeCount(epCount: number, nextEp: any): string {
    if (epCount !== null) {
      return epCount.toString();
    }
    else if (nextEp !== null && nextEp.episode !== null) {
      return `${nextEp.episode}+`;
    }
    else {
      return null
    }
  }

  private resolveImage(localFile: string, externalLink: string): string {
    return localFile ?
      `${api}/img/series/${localFile}` :
      externalLink;
  }

  private resolveSource(source: string) {
    console.log(source);
    switch (source) {
      case 'MANGA':
      case 'LIGHT_NOVEL':
      case 'VISUAL_NOVEL':
      case 'VIDEO_GAME':
      case 'NOVEL':
      case 'DOUJINSHI':
      case 'ANIME':
        return `Source: ${source.replace('_', ' ')}`;
      case 'ORIGINAL':
        return 'Original Work';
      default:
        return source;
    }
  }

  private hovered() {
    this.bannerService.showBanner(this.bannerImage);
  }


  @HostListener('mouseenter')
  private onMouseEnter() {
    // mouse has entered
    // wait for 1 second

    if (this.identified && !this.mouseHere) {
      this.mouseHere = true;
      timer(500).subscribe(() => {
        if (this.mouseHere) {
          this.hovered();
        }
      });
    }
  }

  @HostListener('mouseleave')
  private onMouseLeave() {
    this.mouseHere = false;
    this.bannerService.removeBanner();
  }
}
