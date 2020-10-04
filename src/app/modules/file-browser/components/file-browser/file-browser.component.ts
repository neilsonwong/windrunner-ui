import { Component, OnInit } from '@angular/core';
import { FileKind, DetailKind } from 'src/app/modules/shared/models/Files';
import { Observable, of, merge } from 'rxjs';
import { FileListService } from 'src/app/modules/core/services/file-list.service';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { shareReplay, map, switchMap, tap } from 'rxjs/operators';
import { LinkData } from 'src/app/modules/shared/models/LinkData';
import { UI_ROUTES } from 'src/app/modules/core/routes';
import { Title } from '@angular/platform-browser';
import { APP_TITLE } from 'src/app/modules/shared/constants';

@Component({
  selector: 'app-file-browser',
  templateUrl: './file-browser.component.html',
  styleUrls: ['./file-browser.component.scss']
})
export class FileBrowserComponent implements OnInit {

  place$: Observable<string>;
  breadCrumbs$: Observable<Array<string|LinkData>>;
  loading: boolean = true;
  fileList$: Observable<FileKind[]>;
  details$: Observable<DetailKind>;
  bookmarks$: Observable<Map<string, number>>;
  parent$: Observable<LinkData>;

  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
    private fileListService: FileListService) { }

  ngOnInit() {
    const urlChange$ = this.route.url.pipe(shareReplay());
    this.breadCrumbs$ = urlChange$.pipe(map((e: UrlSegment[]) => this.getBreadCrumbs(e)), shareReplay());
    this.parent$ = this.breadCrumbs$.pipe(
      map((crumbs: Array<string|LinkData>) => {
        const links: Array<LinkData> = crumbs.filter((e: LinkData | string): e is LinkData => (e.hasOwnProperty('url')));
        return links.length > 1 ?
          links[links.length - 2] : null;
      }));

    const empty = of([]).pipe(tap(() => { this.loading = true; }));
    this.place$ = urlChange$.pipe(
      tap((e: UrlSegment[]) => this.setTitle(e)),
      map((e: UrlSegment[]) => this.getPlace(e)),
      shareReplay()
    );
    this.fileList$ = this.place$.pipe(
      switchMap((rel: string) => {
        return merge(empty,
          this.fileListService.getDirectoryListing(rel)
            .pipe(tap(() => { this.loading = false; }))
        );
      })
    );
    this.details$ = this.place$.pipe(
      switchMap(rel => (this.fileListService.getFileDetail(rel))));
  }

  private getPlace(segments: UrlSegment[]): string {
    return '/' + segments.map(segment => decodeURIComponent(segment.toString())).join('/');
  }

  private setTitle(segments: UrlSegment[]): void {
    if (segments.length > 0) {
      const segment = segments[segments.length-1];
      const folderName = decodeURIComponent(segment.toString());
      this.titleService.setTitle(`${folderName} - ${APP_TITLE}`);
    }
    else {
      this.titleService.setTitle(`Browse - ${APP_TITLE}`);
    }
  }

  private getBreadCrumbs(segments: UrlSegment[]): Array<string | LinkData> {
    let cumulativeUrl: string = '';
    const headingTitle: Array<string | LinkData> = [{ text: '/', url: UI_ROUTES.BROWSE }];
    
    // we need to generate the headerLinks
    // as well as the full url
    for (const segment of segments) {
        const decoded = decodeURIComponent(segment.toString());
        cumulativeUrl += `/${decoded}`;
        if (headingTitle.length > 1) {
          headingTitle.push('/');
        }
        headingTitle.push({ text: decoded, url: `${UI_ROUTES.BROWSE}${cumulativeUrl}` });
    }

    return headingTitle;
  }
}
