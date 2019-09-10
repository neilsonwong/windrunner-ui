import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable  } from 'rxjs';
import { map } from 'rxjs/operators';
import { OboeWrapper } from '../utils/oboeWrapper';
import { environment } from '../../environments/environment';

const api = environment.api;

@Injectable({
  providedIn: 'root'
})
export class ThumbnailService {

  constructor(private http: HttpClient,
    private oboe: OboeWrapper) { 
  }

  getThumbnailUrl(fileId: string, img: string): string {
    return `${api}/thumb/${fileId}/${img}`;
  }

  getThumbnail(fileId: string, img: string): Observable<Blob> {
    const endpoint = `${api}/thumb/${fileId}/${img}`;
    return this.http.get(endpoint, { responseType: 'blob'});
  }

  getThumbnailList(fileId: string): Observable<string[]> {
    const endpoint = `${api}/thumblist/${fileId}`;
    return this.oboe.get(endpoint)
      .pipe(map(x => <string[]>x));
  }
}
