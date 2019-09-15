import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { Observable, GroupedObservable } from 'rxjs';
import { flatMap, take, map, tap, groupBy, filter, toArray, share, shareReplay } from 'rxjs/operators';
import { FileListService } from 'src/app/services/file-list.service';
import { FileData } from 'src/app/models/FileData';
import { FileType } from 'src/app/models/FileType';
import { LinkData } from 'src/app/models/LinkData';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  place$: Observable<string>;
  headingTitle$: Observable<Array<string | LinkData>>;
  directories$: Observable<FileData[]>;
  videos$: Observable<FileData[]>;

  loading: boolean;
  counter = 0;

  constructor(private route: ActivatedRoute,
    private fileListService: FileListService) { }

  ngOnInit() {
    this.setupUrlMonitor();
  }

  private setupUrlMonitor() {
    const urlChange$ = this.route.url.pipe(
      tap(() => (this.loading = true)),
      shareReplay(),
    );
    
    this.place$ = urlChange$.pipe(map(e => this.getPlace(e)));
    this.headingTitle$ = urlChange$.pipe(map(e => this.getHeadingTitle(e)));

    const allFiles$: Observable<FileData[]> = this.place$.pipe(
      flatMap(place => this.getDirListing(place)),
    );

    this.directories$ = this.selectFileDataGroup(allFiles$, FileType.DIRECTORY)
      .pipe(tap(() => { console.log('donezo'); this.loading = false;}));
    this.videos$ = this.selectFileDataGroup(allFiles$, FileType.VIDEO);
  }

  private getPlace(segments: UrlSegment[]): string {
    return '/' + segments.map(
      segment => decodeURIComponent(segment.toString())).join('/');
  }

  private getHeadingTitle(segments: UrlSegment[]): Array<string | LinkData> {
    let cumulativeUrl = '';
    const headingTitle: Array<string | LinkData> = [new LinkData('/', `/v/browse/`)];

    // we need to generate the headerLinks
    // as well as the full url
    for (const segment of segments) {
        const decoded = decodeURIComponent(segment.toString());
        cumulativeUrl += `/${decoded}`;
        if (headingTitle.length > 1) {
          headingTitle.push('/');
        }
        headingTitle.push(new LinkData(decoded, `/v/browse/${cumulativeUrl}`));
    }

    if (cumulativeUrl.length === 0) {
      headingTitle.push('ALL YOUR BASES ARE BELONG TO US');
    }

    return headingTitle;
  }

  private getDirListing(directory: string): Observable<FileData[]> {
    return this.fileListService.getDirectoryList(directory)
      .pipe(
        take(1),
        share(),
      );
  }

  private selectFileDataGroup(allFiles$: Observable<FileData[]>, type: FileType) {
    return allFiles$.pipe(
      map(files => files.filter(file => file.type === type))
    );
  }
}
