import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
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
import { FixLongWordsDirective } from './directives/fix-long-words.directive';
import { BytesPipe } from './pipes/bytes.pipe';
import { EpisodePipe } from './pipes/episode.pipe';
import { AgentStatusComponent } from './components/agent-status/agent-status.component';
import { NextEpisodePipe } from './pipes/next-episode.pipe';
import { EpisodeResolutionPipe } from './pipes/episode-resolution.pipe';

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
    FixLongWordsDirective,
    BytesPipe,
    EpisodePipe,
    NextEpisodePipe,
    EpisodeResolutionPipe,
    AgentStatusComponent,
  ],
  providers: [
    DatePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
    RouterModule,
    FormsModule,

    HeaderComponent,
    FooterComponent,
    ErrorComponent,
    LoadingComponent,
    RotatingTextComponent,

    LazyLoadImageDirective,
    HoverDirective,
    FixLongWordsDirective,

    SourceMediaPipe,
    EpisodeCountPipe,
    BgImagePipe,
    SanitizeHtmlPipe,
    BytesPipe,
    EpisodePipe,
    NextEpisodePipe,
    EpisodeResolutionPipe,
  ]
})
export class SharedModule { }
