import { Pipe, PipeTransform } from '@angular/core';

const allUnderscores = new RegExp(/[_]/g);
const animeFileNameMetaData = new RegExp(/[\[|\(](?<subber>[A-Za-z-& _]+)[\]|\)]|[\[|\(](?<videometa>([0-9]{3,4}p|([0-9]{3,4}x[0-9]{3,4})|[-_ \.]|Hi10P|AAC|[hxXH][\.]?264|[xX][vV][iI][dD]|FLAC|BD|TX|10bit)+)[\]|\)]|[\[|\(](?<hash>[A-Z0-9]{8})[\]|\)]|[\.](DVD|HD)|[\.](?<ext>[avimkp4]{3})/g);
const animeAndEp = new RegExp(/^(?<anime>.*?)(\s+-\s+|\s+)([eE][pP])?(?<ep>[0-9]{1,3}(?<version>v\d)?)$/);
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
    return cleaned;
  }
}