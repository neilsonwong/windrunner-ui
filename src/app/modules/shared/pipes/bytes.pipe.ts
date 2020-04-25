import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'bytes'})
export class BytesPipe implements PipeTransform {
  transform(size: number): string {
    if (0 === size) {
        return"0 Bytes";
    }

    const mb = 1024;
    const units = ["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"];
    const exponent = Math.floor(Math.log(size) / Math.log(mb));
    const num = parseFloat((size / Math.pow(mb, exponent)).toFixed(2));
    return `${num} ${units[exponent]}`;
  }
}