import { Pipe, PipeTransform } from '@angular/core';
/*
 * Changes source media into a human readable format
 * Usage:
 *   source | sourceMedia
 * Example:
 *   {{ 'MANGA' | sourceMedia }}
 *   formats to: Source: MANGA
*/
@Pipe({name: 'sourceMedia'})
export class SourceMediaPipe implements PipeTransform {
  transform(source: string): string {
    switch (source) {
      case 'MANGA':
      case 'LIGHT_NOVEL':
      case 'VISUAL_NOVEL':
      case 'VIDEO_GAME':
      case 'NOVEL':
      case 'DOUJINSHI':
      case 'ANIME':
        return `Source: ${source.replace('_', ' ')}`;
      case 'ORIGINAL':
        return 'Original Work';
      default:
        return source;
    }
  }
}