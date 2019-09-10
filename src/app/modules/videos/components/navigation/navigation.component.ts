import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';
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
  rootName: string;
  place: string;
  headingTitle: Array<string | LinkData>;
  directories: FileData[];
  videos: FileData[];
  loaded: boolean;

  constructor(private route: ActivatedRoute,
    private fileListService: FileListService) { }

  ngOnInit() {
    this.rootName = 'All Files';
    this.directories = [];
    this.videos = [];
    this.loaded = false;

    this.decodeLocationFromUrl();
  }

  getDirListing() {
    const dirs = [];
    const vids = [];

    this.fileListService.getDirectoryList(this.place)
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
    this.route.url.subscribe((segments: UrlSegment[]) => {
      // create heading title and place
      let cumulativeUrl = '';
      this.headingTitle = ['/'];
      this.place = '/' + segments
        .map(e => {
          const decoded = decodeURIComponent(e.toString());
          cumulativeUrl += `/${decoded}`;
          this.headingTitle.push(new LinkData(decoded, cumulativeUrl));
          return decoded;
        })
        .join('/');
      this.getDirListing();
    });
  }
}
