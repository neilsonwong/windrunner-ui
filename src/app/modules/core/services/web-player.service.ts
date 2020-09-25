import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, forkJoin, Observable, of } from 'rxjs';
import { distinctUntilChanged, filter, first, map, shareReplay, switchMap, take, tap } from 'rxjs/operators';
import { FileKind, Video } from '../../shared/models/Files';
import StreamSource from '../../shared/models/StreamSource';
import { STREAM_ROUTES, UI_ROUTES } from '../routes';
import { FileListService } from './file-list.service';

@Injectable({
  providedIn: 'root'
})
export class WebPlayerService {
  private nowPlayingSubject$ = new BehaviorSubject<Video>(null);

  // internal fileId observable used to propagate params, may or may not match nowPlaying
  private fileId$ = new BehaviorSubject<string>(null);

  public nowPlaying$: Observable<Video>;
  public source$: Observable<StreamSource>;
  public sourceFolder$: Observable<string>;
  public relatedVideos$: Observable<{next: string, prev: string}>;

  constructor(private router: Router,
    private fileListService: FileListService) {
    this.nowPlaying$ = this.nowPlayingSubject$.asObservable().pipe(
      distinctUntilChanged(),
      shareReplay(),
    );
    const freshLoads$ = this.fileId$.pipe(switchMap(fileId => this.loadVideoData(fileId)));

    this.source$ = this.fileId$.pipe(map(this.mapStreamSource));
    this.sourceFolder$ = this.nowPlaying$.pipe(filter(v => v !== null), map(this.mapSourceFolder));
    this.relatedVideos$ = forkJoin([
      freshLoads$.pipe(first()),
      this.sourceFolder$.pipe(first(), switchMap((rel) => this.loadVideoList(rel))),
    ]).pipe(
      map(([video, list]) => {
        const idx = list.findIndex(e => e.id === video.id);
        const prev = idx > 0 ? list[idx - 1].id : null;
        const next = (idx < list.length - 1) ? list[idx + 1].id : null;
        return { prev, next };
      })
    );

    // if a fileId is passed in, load everything
    freshLoads$.subscribe();
  }

  public playVideo(param: string | Video) {
    let fileId = '';
    if (typeof param === 'string') {
      // this is a fileId
      fileId = param;
    }
    else if (typeof param === 'object') {
      // we got a Video file, no need to resolve fileId
      const videoFile: Video = param;
      fileId = videoFile.id;
    }

    if (fileId) {
      this.setupStream(fileId);
      this.router.navigate([UI_ROUTES.PLAY, fileId], { state: { suppressHeaderReset: true }});
    }
    else {
      console.error(`cannot play file with id ${fileId}`);
    }
  }

  public setupStream(fileId) {
    this.fileId$.next(fileId);
  }

  private mapStreamSource(fileId: string): StreamSource {
    return {
      streamSrc: `${STREAM_ROUTES.GET_STREAM}/${fileId}`,
      subtitleSrc: `${STREAM_ROUTES.GET_SUBTITLE}/${fileId}`
    };
  }

  private mapSourceFolder(video: Video): string {
    const seriesRel = video.rel.substring(0, video.rel.length - video.name.length);
    return seriesRel;
  }

  private loadVideoList(rel: string): Observable<Video[]> {
    console.log('loaded video list')
    return this.fileListService.getDirectoryListing(rel).pipe(
      map((files: FileKind[]) => {
        const isVideoRegExp = new RegExp(/(\.(avi|mkv|ogm|mp4|flv|ogg|wmv|rm|mpeg|mpg)$)/);
        return files.filter((file: FileKind) => (isVideoRegExp.test(file.name))) as any;
      })
    );
  }

  private loadVideoData(fileId: string): Observable<any> {
    // load the video info
    return this.fileListService.getFileDetailById(fileId).pipe(
      map(vid => {
        // cheating here :(
        const video: Video = vid as any;
        this.nowPlayingSubject$.next(video);
        return video;
      })
    );
  }
}