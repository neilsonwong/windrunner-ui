import { Pipe, PipeTransform } from '@angular/core';
import EpisodeData from '../models/EpisodeData';

// as Firefox does not support named capture groups yet, use generic regexes for now
// const allUnderscores = new RegExp(/[_]/g);
// const animeFileNameMetaData = new RegExp(/[\[|\(](?<subber>[A-Za-z-& ]+)[\]|\)]|[\[|\(](?<videometa>([0-9]{3,4}p|([0-9]{3,4}x[0-9]{3,4})|[-_ \.,]|Hi10P|AAC|[hxXH][\.]?264|[xX][vV][iI][dD]|FLAC|BD|DVD|TX|10bit|BluRay|AC3)+)[\]|\)]|[\[|\(](?<hash>[A-Z0-9]{8})[\]|\)]|[\.]?(DVD|[F]?HD)|((\s-\s)THORA)|[\.](?<ext>[avimkp4]{3})/g);
// const animeAndEp = new RegExp(/^(?<anime>.*?)(\s+-\s+|\s+)([eE][pP])?(?<ep>[0-9]{1,3})(\s)*(?<version>v\d)?$/);
// const epAndAnime = new RegExp(/^([eE][pP])?(?<ep>[0-9]{1,3}(?<version>v\d)?)(\s+-\s+|\s+)(?<anime>.*?)$/);

const allUnderscores = new RegExp(/[_]/g);
const animeFileNameMetaData = new RegExp(/[\[|\(]([a-z-& ]+)[\]|\)]|[\[|\(](([0-9]{3,4}p|([0-9]{3,4}x[0-9]{3,4})|[-_ \.,]|hi10P|aac|[hx][\.]?264|xvid|flac|bd|dvd|tx|10bit|blu-?ray|ac3|bd-rip)+)[\]|\)]|[\[|\(]([A-Z0-9]{8})[\]|\)]|[\.]?(DVD|[F]?HD)|((\s-\s)THORA)|[\.]([avimkp4]{3})/ig);
const animeAndEp = new RegExp(/^(.*?)(\s+-\s+|\s+)(ep)?([0-9]{1,3})(\s)*(v\d)?(.*)?$/i);
const epAndAnime = new RegExp(/^(ep)?([0-9]{1,3}(v\d)?)(\s+-\s+|\s+)(.*?)$/i);

// add metadata
interface RegexWithNames { regex: RegExp; meta: { [key: string]: number }; }
const animeAndEpWithNames: RegexWithNames = { regex: animeAndEp, meta: { anime: 1, ep: 4 }};
const epAndAnimeWithNames: RegexWithNames = { regex: epAndAnime, meta: { anime: 5, ep: 2 }};

@Pipe({name: 'episode'})
export class EpisodePipe implements PipeTransform {
  transform(fileName: string): string {
    const cleaned = fileName
      .replace(allUnderscores, ' ')
      .replace(animeFileNameMetaData, '')
      .trim();

    // try to match on my own regex
    return this.matchAndReturnName(animeAndEpWithNames, cleaned) ||
      // ok lets try the backwards one
      this.matchAndReturnName(epAndAnimeWithNames, cleaned) ||
    // still nothing? just return cleaned :(
      (console.log(`couldn't guess ${cleaned}`), cleaned);
  }

  private matchAndReturnName(regexWithNames: RegexWithNames, original: string): string {
    const results = regexWithNames.regex.exec(original);
    if (results !== null) {
      return `${results[regexWithNames.meta['anime']]} - ${results[regexWithNames.meta['ep']]}`;
      // return `${results.groups['anime']} - ${results.groups['ep']}`;
    }
  }

  static inferEpisodeData(fileName: string): EpisodeData {
    const cleaned = fileName
      .replace(allUnderscores, ' ')
      .replace(animeFileNameMetaData, '')
      .trim();

    return this.matchesToEpisodeData(animeAndEpWithNames, cleaned) ||
      this.matchesToEpisodeData(epAndAnimeWithNames, cleaned) ||
      null;
  }

  static matchesToEpisodeData(regexWithNames: RegexWithNames, original: string): EpisodeData {
    const results = regexWithNames.regex.exec(original);
    if (results) {
      const ep = parseInt(results[regexWithNames.meta['ep']], 10);
      if (!isNaN(ep)) {
        return {
          anime: results[regexWithNames.meta['anime']].trim(),
          ep: ep
        };
      }
    }
    return null;
  }
}