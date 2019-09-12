import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from '../shared/shared.module';
import { VideosRoutingModule } from './videos-routing.module';

import { OverviewComponent } from './components/pages/overview/overview.component';
import { NavigationComponent } from './components/pages/navigation/navigation.component';
import { ShowcaseComponent } from './components/display/showcase/showcase.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { VideoDetailComponent } from './components/display/video-detail/video-detail.component';
import { VideosComponent } from './components/videos/videos.component';
import { NewComponent } from './components/pages/new/new.component';
import { DirectoryListComponent } from './components/display/directory-list/directory-list.component';
import { DirectoryDetailComponent } from './components/display/directory-detail/directory-detail.component';
import { FavButtonComponent } from './components/display/fav-button/fav-button.component';
import { FavouritesComponent } from './components/pages/favourites/favourites.component';

@NgModule({
  declarations: [OverviewComponent, NavigationComponent, ShowcaseComponent, SideBarComponent, VideoDetailComponent, VideosComponent, NewComponent, DirectoryListComponent, DirectoryDetailComponent, FavButtonComponent, FavouritesComponent],
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
