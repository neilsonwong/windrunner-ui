import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeriesComponent } from './components/series/series.component';
import { SeriesDetailsComponent } from './components/series-details/series-details.component';

@NgModule({
  declarations: [SeriesComponent, SeriesDetailsComponent],
  imports: [
    CommonModule
  ],
  exports: [
    SeriesComponent
  ]
})
export class SeriesModule { }
