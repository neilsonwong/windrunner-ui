import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OverviewComponent } from './components/pages/overview/overview.component';
import { NavigationComponent } from './components/pages/navigation/navigation.component';
import { VideosComponent } from './components/videos/videos.component';
import { NewComponent } from './components/pages/new/new.component';

const routes: Routes = [
  { path: 'v', component: VideosComponent,
    children: [
    { path: '', component: OverviewComponent },
    { path: 'new', component: NewComponent },
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
