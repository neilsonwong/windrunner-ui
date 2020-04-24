import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeriesComponent } from './components/series/series.component';
import { SeriesDetailsComponent } from './components/series-details/series-details.component';
import { SharedModule } from '../shared/shared.module';
import { SeriesDataSelectComponent } from './components/series-data-select/series-data-select.component';
import { SeriesDataSelectItemComponent } from './components/series-data-select-item/series-data-select-item.component';

@NgModule({
  declarations: [SeriesComponent, SeriesDetailsComponent, SeriesDataSelectComponent, SeriesDataSelectItemComponent],
  imports: [
    SharedModule,
    CommonModule
  ],
  exports: [
    SeriesComponent
  ]
})
export class SeriesModule { }
