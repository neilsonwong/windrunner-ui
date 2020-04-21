import { Component, OnInit, OnChanges } from '@angular/core';
import { AbstractSeriesDataComponent } from 'src/app/modules/shared/components/abstract-series-data/abstract-series-data.component';
import { SafeStyle, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-series-details',
  templateUrl: './series-details.component.html',
  styleUrls: ['./series-details.component.scss']
})
export class SeriesDetailsComponent extends AbstractSeriesDataComponent implements OnInit, OnChanges {

  bannerImageBg: SafeStyle;
  
  constructor( 
    private sanitizer: DomSanitizer) {
    super();
  }

  ngOnInit() {
  }

  ngOnChanges() {
    super.ngOnChanges();
    if (this.bannerImage) {
      // const imgStyle = `linear-gradient(0.25turn, rgba(242, 242, 242, 0.8), rgba(242, 242, 242, 0.5), rgba(242, 242, 242, 0.8)), url(${this.bannerImage})`;
      const imgStyle = `url(${this.bannerImage})`;
      this.bannerImageBg = this.sanitizer.bypassSecurityTrustStyle(imgStyle);
    }
  }

}

