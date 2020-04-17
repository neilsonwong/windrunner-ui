import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { DirectoryKind, FILETYPES, SeriesDirectory } from 'src/app/modules/shared/models/Files';
import { isSeries } from 'src/app/utils/fileTypeUtils';
import { environment } from 'src/environments/environment';

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

  identified: boolean;
  coverImage: string;
  bannerImage: string;
  sourceMedia: string;
  episodeCount: string = null;

  constructor() { }

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
  }

  resolveEpisodeCount(epCount: number, nextEp: any): string {
    if (epCount !== null) {
      return epCount.toString();
    }
    else if (nextEp !== null && nextEp.episode !== null){
      return `${nextEp.episode}+`;
    }
    else {
      return null
    }
  }

  resolveImage(localFile: string, externalLink: string): string {
    return localFile ? 
      `${api}/img/series/${localFile}` :
      externalLink;
  }

  resolveSource(source: string) {
    switch(source) {
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
}
