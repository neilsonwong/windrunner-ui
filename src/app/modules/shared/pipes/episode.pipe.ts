import { Pipe, PipeTransform } from '@angular/core';
import EpisodeData from '../models/EpisodeData';

const allUnderscores = new RegExp(/[_]/g);
const animeFileNameMetaData = new RegExp(/[\[|\(](?<subber>[A-Za-z-& ]+)[\]|\)]|[\[|\(](?<videometa>([0-9]{3,4}p|([0-9]{3,4}x[0-9]{3,4})|[-_ \.,]|Hi10P|AAC|[hxXH][\.]?264|[xX][vV][iI][dD]|FLAC|BD|DVD|TX|10bit|BluRay|AC3)+)[\]|\)]|[\[|\(](?<hash>[A-Z0-9]{8})[\]|\)]|[\.](DVD|HD)|((\s-\s)THORA)|[\.](?<ext>[avimkp4]{3})/g);
const animeAndEp = new RegExp(/^(?<anime>.*?)(\s+-\s+|\s+)([eE][pP])?(?<ep>[0-9]{1,3})(\s)*(?<version>v\d)?$/);
const epAndAnime = new RegExp(/^([eE][pP])?(?<ep>[0-9]{1,3}(?<version>v\d)?)(\s+-\s+|\s+)(?<anime>.*?)$/);

@Pipe({name: 'episode'})
export class EpisodePipe implements PipeTransform {
  transform(fileName: string): string {

    const cleaned = fileName
      .replace(allUnderscores, ' ')
      .replace(animeFileNameMetaData, '')
      .trim();

    // try to match on my own regex
    const results = animeAndEp.exec(cleaned);
    if (results !== null) {
      // 95% of cases
      return `${results.groups['anime']} - ${results.groups['ep']}`;
    }

    // ok lets try the backwards one
    const results2 = epAndAnime.exec(cleaned);
    if (results2 !== null) {
      return `${results2.groups['anime']} - ${results2.groups['ep']}`;
    }

    // still nothing? just return cleaned :(
    console.log(cleaned);
    return cleaned;
  }

  static inferEpisodeData(fileName: string): EpisodeData {
    const cleaned = fileName
      .replace(allUnderscores, ' ')
      .replace(animeFileNameMetaData, '')
      .trim();

    const results = animeAndEp.exec(cleaned);
    let episode = this.matchesToEpisodeData(results);
    if (episode) {
      return episode;
    }

    const results2 = epAndAnime.exec(cleaned);
    episode = this.matchesToEpisodeData(results2);
    if (episode) {
      return episode;
    }

    return null;
  }

  static matchesToEpisodeData(results: any): EpisodeData {
    if (results) {
      const ep = parseInt(results.groups['ep'], 10);
      if (!isNaN(ep)) {
        return {
          anime: results.groups['anime'].trim(),
          ep: ep
        };
      }
    }
    return null;
  }
}