import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OverviewComponent } from './components/overview/overview.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { VideosComponent } from './components/videos/videos.component';

const routes: Routes = [
  { path: 'v', component: VideosComponent,
    children: [
    { path: '', component: OverviewComponent },
    { path: 'browse',
      // handle using wildcard cuz we are cheating with the folder paths
      children: [{ 
        path: '**',
        component: NavigationComponent
      }]
    },
  ]}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class VideosRoutingModule {
}
