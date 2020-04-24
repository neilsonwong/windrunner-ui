import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'episodeCount'})
export class EpisodeCountPipe implements PipeTransform {
  transform(epCount: number, nextEp?: any): string {
    if (epCount !== null) {
      return `${epCount.toString()}`;
    }
    else if (nextEp !== null && nextEp.episode !== null) {
      return `${nextEp.episode}+`;
    }
    else {
      return null;
    }
  }
}