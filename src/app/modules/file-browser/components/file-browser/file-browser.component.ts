import { Component, OnInit } from '@angular/core';
import { FileKind } from 'src/app/modules/shared/models/Files';
import { Observable } from 'rxjs';
import { FileListService } from 'src/app/modules/core/services/file-list.service';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { tap, shareReplay, map, flatMap, switchMap } from 'rxjs/operators';
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
  loading: boolean;
  fileList$: Observable<FileKind[]>;
  bookmarks$: Observable<Map<string, number>>;

  constructor(
    private route: ActivatedRoute,
    private fileListService: FileListService) { }

  ngOnInit() {
    const urlChange$ = this.route.url.pipe(shareReplay());
    // this.place$ = urlChange$.pipe();
    this.breadCrumbs$ = urlChange$.pipe(map((e: UrlSegment[]) => this.getBreadCrumbs(e)));
    this.fileList$ = urlChange$.pipe(
      map((e: UrlSegment[]) => this.getPlace(e)),
      switchMap((rel: string) => this.fileListService.getDirectoryListing(rel))
    );
    this.bookmarks$ = this.fileList$.pipe(
      map((files: FileKind[]) => {
        const bookmarks = new Map<string, number>();
        files.forEach((file, index) => {
          const firstChar = file.name[0];
          if (!bookmarks.has(firstChar)) {
            bookmarks.set(firstChar, index);
          }
        });
        return bookmarks; 
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
