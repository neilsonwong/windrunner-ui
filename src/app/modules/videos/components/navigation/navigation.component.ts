import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { FileListService } from 'src/app/services/file-list.service';
import { FileData } from 'src/app/models/FileData';
import { LinkData } from 'src/app/models/LinkData';
import { FileType } from 'src/app/models/FileType';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  place: string;
  directories: FileData[];
  videos: FileData[];

  constructor(private route: ActivatedRoute,
    private fileListService: FileListService) { }

  ngOnInit() {
    this.directories = [];
    this.videos = [];

    this.decodeLocationFromUrl();
  }

  getDirListing() {
    this.fileListService.getDirectoryList(this.place)
      .subscribe((data: FileData[]) => {
        for (const file of data) {
          if (file.type === FileType.DIRECTORY) {
            this.directories.push(file);
          }
          else if (file.type === FileType.VIDEO) {
            this.videos.push(file);
          }
        }
      });
  }

  private decodeLocationFromUrl() {
    this.route.url.subscribe((segments: UrlSegment[]) => {
      this.place = segments
        .map(e => decodeURIComponent(e.toString()))
        .join('/');
      this.getDirListing();
    });
  }
}
