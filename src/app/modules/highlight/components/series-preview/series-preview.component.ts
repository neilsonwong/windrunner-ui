import { Component, HostBinding, HostListener, OnChanges, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { SeriesDirectory, DirectoryKind } from 'src/app/modules/shared/models/Files';
import { isSeries } from 'src/app/utils/fileTypeUtils';
import { Observable, Subscription } from 'rxjs';
import { HeaderTweakService } from 'src/app/modules/core/services/header-tweak.service';
import { FileListService } from 'src/app/modules/core/services/file-list.service';
import { map, tap } from 'rxjs/operators';
import { PendingResourceRetrievalService } from 'src/app/modules/core/services/pending-resource-retrieval.service';
import { UI_ROUTES } from 'src/app/modules/core/routes';
import { ImageResolverService } from 'src/app/modules/core/services/image-resolver.service';

@Component({
  selector: 'app-series-preview',
  templateUrl: './series-preview.component.html',
  styleUrls: ['./series-preview.component.scss']
})
export class SeriesPreviewComponent implements OnChanges, OnDestroy {
  @Input() series: DirectoryKind;
  @Input() hidable: boolean = false;
  @Output() hide: EventEmitter<string> = new EventEmitter<string>();

  identified: boolean;
  coverImage: string;
  bannerImage: string;
  seriesLink: string;
  folderLink: string;

  showHideButton: boolean;
  subs: Array<Subscription> = [];

  constructor(
    private imgResolver: ImageResolverService,
    private headerTweakService: HeaderTweakService,
    private pendingService: PendingResourceRetrievalService,
    protected fileListService: FileListService) { }

  ngOnDestroy(): void {
    this.subs.forEach((sub: Subscription) => {
      sub.unsubscribe();
    });
  }

  @HostBinding('class.series') get isSeries() {
    return this.identified;
  }

  ngOnChanges() {
    if (!this.populateSeriesValues()) {
      // this is a normal dir atm
      this.subs.push(
        this.pendingService.waitForPromised<SeriesDirectory>(this.series.promised, this.getDetails$())
          .pipe(tap((updated: SeriesDirectory) => this.handleUpdatedValue(updated))).subscribe()
      );
    }
  }

  private populateSeriesValues(): boolean {
    if (this.series) {
      this.folderLink = `${UI_ROUTES.BROWSE}${this.series.rel}`;
      this.seriesLink = `${UI_ROUTES.SERIES}${this.series.rel}`;

      if (isSeries(this.series)) {
        this.identified = true;
        this.coverImage = this.imgResolver.resolveImage(this.series.aniListData.localCoverImage, this.series.aniListData.coverImage);
        this.bannerImage = this.imgResolver.resolveImage(this.series.aniListData.localBannerImage, this.series.aniListData.bannerImage);
        return true;
      }
    }
    return false;
  }
  
  protected handleUpdatedValue(updated: SeriesDirectory): void {
    if (updated !== null) {
      this.series = updated;
      this.populateSeriesValues();
    }
  }

  protected getDetails$(): Observable<SeriesDirectory> {
    return this.fileListService.getFileDetail(this.series.rel)
      .pipe(map(result => (
        (isSeries(result)) ?
          result :
          null
      )));
  }

  @HostListener('hoverChange', ['$event'])
  public onHover(isHovered: boolean): void {
    if (isHovered) {
      this.headerTweakService.showBanner(this.bannerImage);
      this.showHideButton = true;
    }
    else {
      this.headerTweakService.removeBanner();
      this.showHideButton = false;
    }
  }

  public hideSeries(): void {
    this.hide.emit(this.series.rel);
  }

  public _isSeries(dir: DirectoryKind): dir is SeriesDirectory {
      return isSeries(dir);
  }
}
