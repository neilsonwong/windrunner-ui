import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Pipe({name: 'bgImage'})
export class BgImagePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }

  transform(imageUrl: string): SafeStyle {
    const imgStyle = `url(${imageUrl})`;
    return this.sanitizer.bypassSecurityTrustStyle(imgStyle);
  }
}