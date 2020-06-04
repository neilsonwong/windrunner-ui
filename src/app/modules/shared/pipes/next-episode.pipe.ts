import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NextAiringEpData } from '../models/AniListData';

@Pipe({name: 'nextEpisode'})
export class NextEpisodePipe implements PipeTransform {
  constructor(private datePipe: DatePipe) { }

  transform(nextEp?: NextAiringEpData): string {
    if (nextEp !== null && nextEp.episode !== null && nextEp.airingAt !== null) {
      return `Ep ${nextEp.episode} airs on ${this.datePipe.transform(nextEp.airingAt * 1000, 'MMM d, y h:mm a')}`;
    }
    else {
      return null;
    }
  }
}