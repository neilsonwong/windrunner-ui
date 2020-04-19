import { Component, OnInit } from '@angular/core';
import { FileKind } from 'src/app/modules/shared/models/Files';
import { Observable, of, merge } from 'rxjs';
import { FileListService } from 'src/app/modules/core/services/file-list.service';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { shareReplay, map, switchMap, tap } from 'rxjs/operators';
import { LinkData } from 'src/app/modules/shared/models/LinkData';
import { UI_ROUTES } from 'src/app/modules/core/routes';

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
  bookmarks$: Observable<Map<string, number>>;

  constructor(
    private route: ActivatedRoute,
    private fileListService: FileListService) { }

  ngOnInit() {
    const urlChange$ = this.route.url.pipe(shareReplay());
    this.breadCrumbs$ = urlChange$.pipe(map((e: UrlSegment[]) => this.getBreadCrumbs(e)));

    const empty = of([]).pipe(tap(() => { this.loading = true; }));
    this.fileList$ = urlChange$.pipe(
      map((e: UrlSegment[]) => this.getPlace(e)),
      switchMap((rel: string) => {
        return merge(empty,
          this.fileListService.getDirectoryListing(rel)
            .pipe(tap(() => { this.loading = false; }))
        );
      })
    );
  }

  private getPlace(segments: UrlSegment[]): string {
    return '/' + segments.map(segment => decodeURIComponent(segment.toString())).join('/');
  }

  private getBreadCrumbs(segments: UrlSegment[]): Array<string | LinkData> {
    let cumulativeUrl = '';
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
