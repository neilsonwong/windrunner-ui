import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { FileListService } from 'src/app/services/file-list.service';
import { FileData } from 'src/app/models/FileData';
import { FileType } from 'src/app/models/FileType';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  rootName: string;
  place: string;
  directories: FileData[];
  videos: FileData[];

  constructor(private route: ActivatedRoute,
    private fileListService: FileListService) { }

  ngOnInit() {
    this.rootName = 'All Files';
    this.directories = [];
    this.videos = [];

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
        this.directories = dirs;
        this.videos = vids;
      });
  }

  private decodeLocationFromUrl() {
    this.route.url.subscribe((segments: UrlSegment[]) => {
      this.place = '/' + segments
        .map(e => decodeURIComponent(e.toString()))
        .join('/');
      this.getDirListing();
    });
  }
}
