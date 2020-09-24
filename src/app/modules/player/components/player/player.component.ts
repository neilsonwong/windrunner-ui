import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { first, map, mapTo, share, switchMap, tap } from 'rxjs/operators';
import { STREAM_ROUTES } from 'src/app/modules/core/routes';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  // public file$: Observable<string>;
  public streamSource$: Observable<string>;
  public subSource$: Observable<string>;
  public readyToStream$: Observable<{stream: string, subs: string}>;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    const fileId$ = this.route.paramMap.pipe(
      map(params => params.get('fileId')),
      share(),
    );

    // this.file$ = fileId$.pipe(switchMap(fileId => this.fileListService.getFileDetail()))
    this.streamSource$ = fileId$.pipe(first(), map(fileId => `${STREAM_ROUTES.GET_STREAM}/${fileId}`));
    this.subSource$ = fileId$.pipe(first(), map(fileId => `${STREAM_ROUTES.GET_SUBTITLE}/${fileId}`));
    this.readyToStream$ = forkJoin([this.streamSource$, this.subSource$]).pipe(
      map(([stream, subs]) => ({stream, subs}))
    );
  }
}
