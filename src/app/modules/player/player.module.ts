import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { VideoPlayerComponent } from './components/video-player/video-player.component';
import { PlayerComponent } from './components/player/player.component';



@NgModule({
  declarations: [VideoPlayerComponent, PlayerComponent],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class PlayerModule { }
