import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VideoAppComponent } from './components/video-app/video-app.component';
import { FileBrowserComponent } from '../file-browser/components/file-browser/file-browser.component';
import { HighlightComponent } from '../highlight/components/highlight/highlight.component';

const routes: Routes = [
  { path: 'v', component: VideoAppComponent,
    children: [
      { path: '', component: HighlightComponent },
      { path: 'browse', component: FileBrowserComponent }
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