import { Injectable } from '@angular/core';
import { VariableRoutingService } from './variable-routing.service';
import { API_ROUTE_OPTIONS } from '../routes';

@Injectable({
  providedIn: 'root'
})
export class ImageResolverService {
  constructor(private variableRoutingService: VariableRoutingService) { }

  public resolveImage(localFile: string, externalLink: string): string {
    const route = this.variableRoutingService.resolveRoute(API_ROUTE_OPTIONS.IMG_SERIES);
    return localFile ?
      `${route}/${localFile}` :
      externalLink;
  }
}