import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { VideoAppRoutingModule } from './video-app-routing.module';
import { FileBrowserModule } from '../file-browser/file-browser.module';
import { HighlightModule } from '../highlight/highlight.module';

import { VideoAppComponent } from './components/video-app/video-app.component';

@NgModule({
  declarations: [VideoAppComponent],
  imports: [
    CommonModule,
    SharedModule,
    VideoAppRoutingModule,
    HighlightModule,
    FileBrowserModule
  ]
})
export class VideoAppModule { }
