import { Component, OnChanges, Input } from '@angular/core';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-box-header',
  templateUrl: './box-header.component.html',
  styleUrls: ['./box-header.component.scss']
})
export class BoxHeaderComponent implements OnChanges {
  @Input() heading: string;
  @Input() watched: number;
  @Input() totalVideoCount: number;
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
    if (this.watched !== undefined && this.totalVideoCount !== undefined && this.totalVideoCount > 0) {
      this.additionalData.push(`Watched ${this.watched} of ${this.totalVideoCount}`);
    }
    // handle non videos
    else if (this.totalCount) {
      const itemOrItems = this.totalCount === 1 ? 'item' : 'items';
      this.additionalData.push(`${this.totalCount} ${itemOrItems} in folder`);
    }
  }
}
