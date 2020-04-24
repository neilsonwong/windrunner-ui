import { Injectable } from '@angular/core';
import { API_ROUTES } from '../routes';

@Injectable({
  providedIn: 'root'
})
export class ImageResolverService {
  constructor() { }

  public resolveImage(localFile: string, externalLink: string): string {
    return localFile ?
      `${API_ROUTES.IMG_SERIES}/${localFile}` :
      externalLink;
  }
}