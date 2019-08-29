import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OverviewComponent } from './components/overview/overview.component';
import { NavigationComponent } from './components/navigation/navigation.component';

const routes: Routes = [
  { path: 'v', component: OverviewComponent },
  { path: 'v/browse',
    // handle using wildcard cuz we are cheating with the folder paths
    children: [{ 
      path: '**',
      component: NavigationComponent
    }]
  }
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
