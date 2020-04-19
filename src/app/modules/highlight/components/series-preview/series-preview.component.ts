import { Component, Input, HostBinding, Output, EventEmitter, HostListener, OnChanges } from '@angular/core';
import { DirectoryKind, SeriesDirectory } from 'src/app/modules/shared/models/Files';
import { isSeries } from 'src/app/utils/fileTypeUtils';
import { environment } from 'src/environments/environment';
import { timer, Observable } from 'rxjs';
import { HeaderTweakService } from 'src/app/modules/core/services/header-tweak.service';
import { AbstractPromisedComponent } from 'src/app/modules/shared/components/abstract-promised/abstract-promised.component';
import { FileListService } from 'src/app/modules/core/services/file-list.service';
import { UI_ROUTES, API_ROUTES } from 'src/app/modules/core/routes';
import { filter, map } from 'rxjs/operators';

const api = environment.api;

@Component({
  selector: 'app-series-preview',
  templateUrl: './series-preview.component.html',
  styleUrls: ['./series-preview.component.scss']
})
export class SeriesPreviewComponent extends AbstractPromisedComponent<SeriesDirectory> implements OnChanges {
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

  constructor(
    private headerTweakService: HeaderTweakService,
    protected fileListService: FileListService) {
    super(fileListService);
  }

  ngOnChanges() {
    if (isSeries(this.series)) {
      this.populateSeriesValues(this.series);
    }
    else {
      // this is a normal dir
      this.waitForPromised(this.series.promised);
      
    }
    // everybody needs a link!
    this.seriesLink = `${UI_ROUTES.BROWSE}${this.series.rel}`;
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

  // abstract implementation
  protected tryGetResource(): Observable<SeriesDirectory> {
    return this.fileListService.getFileDetail(this.series.rel)
      .pipe(map(result => (
        (isSeries(result)) ?
        result :
        null
      )));
  }

  // abstract implementation
  protected handleUpdatedValue(updated: SeriesDirectory): void {
    if (updated !== null) {
      this.series = updated;
      this.populateSeriesValues(updated);
    }
  }

  private hovered() {
    this.headerTweakService.showBanner(this.bannerImage);
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
    this.headerTweakService.removeBanner();
  }
}
