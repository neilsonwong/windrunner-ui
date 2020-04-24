import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SeriesOption } from 'src/app/modules/shared/models/SeriesOptions';

@Component({
  selector: 'app-series-data-select-item',
  templateUrl: './series-data-select-item.component.html',
  styleUrls: ['./series-data-select-item.component.scss']
})
export class SeriesDataSelectItemComponent implements OnInit {
  @Input() seriesOption: SeriesOption;
  @Output() seriesOptionChange: EventEmitter<number> = new EventEmitter<number>();

  names: Array<string>;

  constructor() { }

  ngOnInit() {
    if (this.seriesOption) {
      this.names = [
        this.seriesOption.title.romaji,
        this.seriesOption.title.english,
        ...this.seriesOption.synonyms,
      ];
    }
  }

  updateSelected() {
    this.seriesOptionChange.emit(this.seriesOption.id);
  }
}
