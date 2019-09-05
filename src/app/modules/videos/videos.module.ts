import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from '../shared/shared.module';
import { VideosRoutingModule } from './videos-routing.module';

import { OverviewComponent } from './components/overview/overview.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ShowcaseComponent } from './components/showcase/showcase.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { VideoDetailComponent } from './components/video-detail/video-detail.component';
import { VideosComponent } from './components/videos/videos.component';

@NgModule({
  declarations: [OverviewComponent, NavigationComponent, ShowcaseComponent, SideBarComponent, VideoDetailComponent, VideosComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    VideosRoutingModule,
  ],
  exports: [
    VideosComponent
  ]
})
export class VideosModule { }
