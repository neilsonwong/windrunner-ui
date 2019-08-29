import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { VideosRoutingModule } from './videos-routing.module';

import { OverviewComponent } from './components/overview/overview.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ShowcaseComponent } from './components/showcase/showcase.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';

@NgModule({
  declarations: [OverviewComponent, NavigationComponent, ShowcaseComponent, SideBarComponent],
  imports: [
    CommonModule,
    SharedModule,
    VideosRoutingModule,
  ],
  exports: [
    OverviewComponent
  ]
})
export class VideosModule { }
