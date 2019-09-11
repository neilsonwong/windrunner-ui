import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { OnDestroy } from "@angular/core";
import { FileListService } from 'src/app/services/file-list.service';
import { FileData } from 'src/app/models/FileData';
import { FileType } from 'src/app/models/FileType';
import { LinkData } from 'src/app/models/LinkData';
import { Subscription } from 'rxjs';
import { flatMap, take, map } from 'rxjs/operators';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {
  place: string;
  headingTitle: Array<string | LinkData>;
  directories: FileData[];
  videos: FileData[];
  loaded: boolean;
  counter = 0;

  private urlSubscription: Subscription;

  constructor(private route: ActivatedRoute,
    private fileListService: FileListService) { }

  ngOnInit() {
    this.directories = [];
    this.videos = [];
    this.loaded = false;

    this.urlSubscription = this.decodeLocationFromUrl();
  }

  private getDirListing(directory: string) {
    const dirs = [];
    const vids = [];

    console.log(directory);

    return this.fileListService.getDirectoryList(directory)
      .pipe(take(1))
      .subscribe((data: FileData[]) => {
        for (const file of data) {
          if (file.type === FileType.DIRECTORY) {
            dirs.push(file);
          }
          else if (file.type === FileType.VIDEO) {
            vids.push(file);
          }
        }
        this.loaded = true;
        this.directories = dirs;
        this.videos = vids;
      });
  }

  private decodeLocationFromUrl() {
    return this.route.url
      .pipe(
        map((segments: UrlSegment[]) => {
          // create heading title and place
          this.loaded = false;
          return this.populateHeaders(segments);
        }),
        flatMap((directory: string) => {
          this.getDirListing(directory);
          return directory;
        })
      ).subscribe();
  }

  private populateHeaders(segments: UrlSegment[]): string {
    let cumulativeUrl = '';
    this.headingTitle = [new LinkData('/', `/v/browse/`)];

    // we need to generate the headerLinks
    // as well as the full url
    for (const segment of segments) {
        const decoded = decodeURIComponent(segment.toString());
        cumulativeUrl += `/${decoded}`;
        if (this.headingTitle.length > 1) {
          this.headingTitle.push('/');
        }
        this.headingTitle.push(new LinkData(decoded, `/v/browse/${cumulativeUrl}`));
    }
    if (cumulativeUrl.length === 0) {
      this.place = '/';
      this.headingTitle.push('ALL YOUR BASES ARE BELONG TO US');
    }
    else {
      this.place = cumulativeUrl;
    }
    console.log(this.place);
    return this.place;
  }

  ngOnDestroy() {
    if (this.urlSubscription) {
      this.urlSubscription.unsubscribe();
    }
  }
}
