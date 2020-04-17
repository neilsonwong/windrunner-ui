import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { RecentListComponent } from './components/recent-list/recent-list.component';
import { FavouriteListComponent } from './components/favourite-list/favourite-list.component';
import { HighlightComponent } from './components/highlight/highlight.component';
import { SeriesPreviewComponent } from './components/series-preview/series-preview.component';

@NgModule({
  declarations: [RecentListComponent, FavouriteListComponent, HighlightComponent, SeriesPreviewComponent],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    HighlightComponent
  ]
})
export class HighlightModule { }
