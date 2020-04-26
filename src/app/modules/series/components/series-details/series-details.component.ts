import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { SafeStyle, DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { isSeries, isInvalid } from 'src/app/utils/fileTypeUtils';
import { SeriesOptions } from 'src/app/modules/shared/models/SeriesOptions';
import { Observable } from 'rxjs';
import { HeaderTweakService } from 'src/app/modules/core/services/header-tweak.service';
import { ImageResolverService } from 'src/app/modules/core/services/image-resolver.service';
import { DirectoryKind, DetailKind } from 'src/app/modules/shared/models/Files';
import { UI_ROUTES } from 'src/app/modules/core/routes';

@Component({
  selector: 'app-series-details',
  templateUrl: './series-details.component.html',
  styleUrls: ['./series-details.component.scss']
})
export class SeriesDetailsComponent implements OnInit, OnChanges {
  @Input() series: DetailKind;
  @Input() isFavourite: boolean;
  @Input() isRecommend: boolean;
  @Input() optionsList$: Observable<SeriesOptions>;
  @Output() favouriteChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() recommendChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() seriesOptionChange: EventEmitter<number> = new EventEmitter<number>();

  identified: boolean;
  coverImage: string;
  bannerImage: string;
  altNames: Array<string>;
  seriesLink: string;
  folderLink: string;

  expandedBanner: boolean;
  editing: boolean;
  isInvalid: boolean;

  constructor(
    private imgResolver: ImageResolverService,
    private headerTweakService: HeaderTweakService,
  ) { }

  ngOnInit() {
    this.expandedBanner = false;
    this.editing = false;
  }

  ngOnChanges() {
    this.populateSeriesValues();
  }

  private populateSeriesValues(): boolean {
    if (this.series) {
      this.folderLink = `${UI_ROUTES.BROWSE}${this.series.rel}`;
      this.seriesLink = `${UI_ROUTES.SERIES}${this.series.rel}`;
      if (isSeries(this.series)) {
        this.identified = true;
        this.coverImage = this.imgResolver.resolveImage(this.series.aniListData.localCoverImage, this.series.aniListData.coverImage);
        this.bannerImage = this.imgResolver.resolveImage(this.series.aniListData.localBannerImage, this.series.aniListData.bannerImage);

        this.altNames = [
          this.series.aniListData.englishTitle,
          this.series.aniListData.title
        ];

        if (this.bannerImage) {
          this.headerTweakService.setTransparent();
        }
        else {
          this.headerTweakService.resetTransparent();
        }
        return true;
      }
      else if(isInvalid(this.series)) {
        this.isInvalid = true;
      }
    }
    return false;
  }


  toggleBannerHeight() {
    this.expandedBanner = !this.expandedBanner;
  }

  toggleFavourite() {
    this.isFavourite = !this.isFavourite;
    this.favouriteChange.emit(this.isFavourite);
  }

  toggleRecommended() {
    this.isRecommend = !this.isRecommend;
    this.recommendChange.emit(this.isRecommend);
  }

  updateAniListInfo() {
    this.editing = !this.editing;
  }

  updateSeriesOption(newAniListId: number) {
    this.seriesOptionChange.emit(newAniListId);
    this.editing = false;
  }
}

