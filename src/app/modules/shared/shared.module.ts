import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { LazyLoadImageDirective } from './directives/lazy-load-image.directive';
import { ErrorComponent } from './components/error/error.component';
import { LoadingComponent } from './components/loading/loading.component';
import { HoverDirective } from './directives/hover.directive';
import { AbstractSeriesDataComponent } from './components/abstract-series-data/abstract-series-data.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SearchBarComponent,
    LazyLoadImageDirective,
    ErrorComponent,
    LoadingComponent,
    HoverDirective,
    AbstractSeriesDataComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    LazyLoadImageDirective,
    ErrorComponent,
    LoadingComponent,
    RouterModule,
    HoverDirective
  ]
})
export class SharedModule { }
