import { OnChanges, Component, Input } from '@angular/core';
import { DirectoryKind, SeriesDirectory } from '../../models/Files';
import { isSeries } from 'src/app/utils/fileTypeUtils';
import { UI_ROUTES, API_ROUTES } from 'src/app/modules/core/routes';

@Component({ template: '' })
export class AbstractSeriesDataComponent implements OnChanges {
  @Input() series: DirectoryKind;

  identified: boolean;
  coverImage: string;
  bannerImage: string;
  sourceMedia: string;
  episodeCount: string = null;
  seriesLink: string;
  folderLink: string;

  constructor() { }

  ngOnChanges() {
    if (this.series) {
        if (isSeries(this.series)) {
          this.populateSeriesValues(this.series);
        }
        this.folderLink = `${UI_ROUTES.BROWSE}${this.series.rel}`;
        this.seriesLink = `${UI_ROUTES.SERIES}${this.series.rel}`;
    }
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

  populateSeriesValues(series: SeriesDirectory) {
      this.identified = true;
      this.coverImage = this.resolveImage(series.aniListData.localCoverImage, series.aniListData.coverImage);
      this.bannerImage = this.resolveImage(series.aniListData.localBannerImage, series.aniListData.bannerImage);
      this.sourceMedia = this.resolveSource(series.aniListData.source);
      this.episodeCount = this.resolveEpisodeCount(series.aniListData.episodes, series.aniListData.nextAiringEpisode);
  }

  private resolveImage(localFile: string, externalLink: string): string {
    return localFile ?
      `${API_ROUTES.IMG_SERIES}/${localFile}` :
      externalLink;
  }

  private resolveSource(source: string) {
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
}