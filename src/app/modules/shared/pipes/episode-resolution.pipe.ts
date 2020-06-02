import { Pipe, PipeTransform } from '@angular/core';

const resolutionRegex = new RegExp(/([0-9]{3,4}p)/);

@Pipe({name: 'episodeResolution'})
export class EpisodeResolutionPipe implements PipeTransform {
  transform(fileName: string): string {
    const results = resolutionRegex.exec(fileName);
    if (results !== null) {
      return `${results[1]}`;
    }

    console.log('no matches for ' + fileName);
    return '';
  }
}