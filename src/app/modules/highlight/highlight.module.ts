import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { SeriesListComponent } from './components/series-list/series-list.component';
import { HighlightComponent } from './components/highlight/highlight.component';
import { SeriesPreviewComponent } from './components/series-preview/series-preview.component';
import { RecommendedComponent } from './components/recommended/recommended.component';

@NgModule({
  declarations: [SeriesListComponent, HighlightComponent, SeriesPreviewComponent, RecommendedComponent],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    HighlightComponent
  ]
})
export class HighlightModule { }
