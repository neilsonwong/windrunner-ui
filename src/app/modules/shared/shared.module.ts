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
import { FooterComponent } from './components/footer/footer.component';
import { SourceMediaPipe } from './pipes/source-media.pipe';
import { EpisodeCountPipe } from './pipes/episode-count.pipe';
import { RotatingTextComponent } from './components/rotating-text/rotating-text.component';
import { BgImagePipe } from './pipes/bg-image-url.pipe';
import { SanitizeHtmlPipe } from './pipes/sanitize-html.pipe';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SearchBarComponent,
    LazyLoadImageDirective,
    ErrorComponent,
    LoadingComponent,
    HoverDirective,
    SourceMediaPipe,
    EpisodeCountPipe,
    BgImagePipe,
    SanitizeHtmlPipe,
    RotatingTextComponent,
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
    HoverDirective,
    SourceMediaPipe,
    EpisodeCountPipe,
    BgImagePipe,
    SanitizeHtmlPipe,
    RotatingTextComponent,
  ]
})
export class SharedModule { }
