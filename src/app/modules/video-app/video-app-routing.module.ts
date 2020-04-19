import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VideoAppComponent } from './components/video-app/video-app.component';
import { FileBrowserComponent } from '../file-browser/components/file-browser/file-browser.component';
import { HighlightComponent } from '../highlight/components/highlight/highlight.component';
import { SeriesComponent } from '../series/components/series/series.component';
import { MaintenanceComponent } from '../maintenance/components/maintenance/maintenance.component';

const routes: Routes = [
  { path: 'v', component: VideoAppComponent,
    children: [
      { path: '', component: HighlightComponent },
      { path: 'browse', 
        // handle using wildcard cuz we are cheating with the folder paths
        children: [{ 
          path: '**',
          component: FileBrowserComponent
        }]
      },
      { path: 'series', 
        // handle using wildcard cuz we are cheating with the folder paths
        children: [{ 
          path: '**',
          component: SeriesComponent
        }]
      },
      { path: 'maintenance', component: MaintenanceComponent },
    ]
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

export class VideoAppRoutingModule {
}