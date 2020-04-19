import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { LazyLoadImageDirective } from './directives/lazy-load-image.directive';
import { ErrorComponent } from './components/error/error.component';
import { BoxHeaderComponent } from './components/box-header/box-header.component';
import { LoadingComponent } from './components/loading/loading.component';
import { HoverDirective } from './directives/hover.directive';
import { AbstractPromisedComponent } from './components/abstract-promised/abstract-promised.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SearchBarComponent,
    LazyLoadImageDirective,
    ErrorComponent,
    BoxHeaderComponent,
    LoadingComponent,
    HoverDirective,
    AbstractPromisedComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
    HeaderComponent,
    LazyLoadImageDirective,
    ErrorComponent,
    BoxHeaderComponent,
    LoadingComponent,
    RouterModule,
  ]
})
export class SharedModule { }
