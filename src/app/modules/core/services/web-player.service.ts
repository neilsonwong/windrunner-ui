import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DetailKind, Video } from '../../shared/models/Files';
import { STREAM_ROUTES, UI_ROUTES } from '../routes';
import { FileListService } from './file-list.service';

@Injectable({
  providedIn: 'root'
})
export class WebPlayerService {
  public nowPlaying: Video;
  public streamSource: string; 
  public subSource: string; 

  constructor(private router: Router,
    private fileListService: FileListService) { }

  public playVideo(videoFile: Video) {
    this.nowPlaying = videoFile;
    this.setSources(videoFile.id);
    this.router.navigate([UI_ROUTES.PLAY, videoFile.id]);
  }

  public setSources(fileId) {
    this.streamSource = `${STREAM_ROUTES.GET_STREAM}/${fileId}`;
    this.subSource = `${STREAM_ROUTES.GET_SUBTITLE}/${fileId}`;
  }

  public loadVideoData(fileId: string) {
    return this.fileListService.getFileDetailById(fileId).pipe(
      // cheating here :(
      tap(vid => (this.nowPlaying = vid as any))
    );
  }
}