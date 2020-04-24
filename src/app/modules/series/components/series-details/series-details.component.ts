import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { AbstractSeriesDataComponent } from 'src/app/modules/shared/components/abstract-series-data/abstract-series-data.component';
import { SafeStyle, DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { isSeries } from 'src/app/utils/fileTypeUtils';
import { SeriesOptions } from 'src/app/modules/shared/models/SeriesOptions';
import { Observable } from 'rxjs';
import { HeaderTweakService } from 'src/app/modules/core/services/header-tweak.service';

@Component({
  selector: 'app-series-details',
  templateUrl: './series-details.component.html',
  styleUrls: ['./series-details.component.scss']
})
export class SeriesDetailsComponent extends AbstractSeriesDataComponent implements OnInit, OnChanges {
  @Input() isFavourite: boolean;
  @Input() optionsList$: Observable<SeriesOptions>;
  @Output() favouriteChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() seriesOptionChange: EventEmitter<number> = new EventEmitter<number>();

  expandedBanner: boolean;
  bannerImageBg: SafeStyle;
  seriesDescription: SafeHtml;
  editing: boolean;

  constructor( 
    private headerTweakService: HeaderTweakService,
    private sanitizer: DomSanitizer) {
    super();
  }

  ngOnInit() {
    this.expandedBanner = false;
    this.editing = false;
  }

  ngOnChanges() {
    super.ngOnChanges();
    if (this.series && isSeries(this.series)) {
      if (this.bannerImage) {
        this.headerTweakService.setTransparent();
        // const imgStyle = `linear-gradient(0.25turn, rgba(242, 242, 242, 0.8), rgba(242, 242, 242, 0.5), rgba(242, 242, 242, 0.8)), url(${this.bannerImage})`;
        const imgStyle = `url(${this.bannerImage})`;
        this.bannerImageBg = this.sanitizer.bypassSecurityTrustStyle(imgStyle);
      }
      else {
        this.headerTweakService.resetTransparent();
      }

      if (this.series.aniListData.description) {
        this.seriesDescription = this.sanitizer.bypassSecurityTrustHtml(this.series.aniListData.description);
      }
    }
  }

  toggleBannerHeight() {
    this.expandedBanner = !this.expandedBanner;
  }

  toggleFavourite() {
    this.isFavourite = !this.isFavourite;
    this.favouriteChange.emit(this.isFavourite);
  }

  updateAniListInfo() {
    this.editing = !this.editing;
  }

  updateSeriesOption(newAniListId: number) {
    this.seriesOptionChange.emit(newAniListId);
    this.editing = false;
  }
}

