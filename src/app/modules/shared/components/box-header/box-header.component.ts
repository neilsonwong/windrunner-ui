import { Component, OnChanges, Input } from '@angular/core';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-box-header',
  templateUrl: './box-header.component.html',
  styleUrls: ['./box-header.component.scss']
})
export class BoxHeaderComponent implements OnChanges {
  @Input() title: string;
  @Input() watched: number;
  @Input() totalCount: number;
  @Input() lastUpdated: Date;
  additionalData: string[];

  constructor() { }

  ngOnChanges() {
    this.additionalData = [];
    // update time
    if (this.lastUpdated) {
      this.additionalData.push(`Last updated at ${formatDate(this.lastUpdated, 'medium', 'en-US')}`);
    }

    // handle watched
    if (this.watched !== undefined && this.totalCount !== undefined) {
      this.additionalData.push(`Watched ${this.watched} of ${this.totalCount}`);
    }
    else if (this.totalCount) {
      this.additionalData.push(`${this.totalCount} items`);
    }

  }
}
