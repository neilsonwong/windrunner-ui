import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable  } from 'rxjs';
import { map } from 'rxjs/operators';

import { OboeWrapper } from '../utils/oboeWrapper';

const apiRoot = 'http://localhost:8000/api/v2';

@Injectable({
  providedIn: 'root'
})
export class ThumbnailService {

  constructor(private http: HttpClient,
    private oboe: OboeWrapper) { 
  }

  getThumbnailUrl(fileId: string, img: string): string {
    return `${apiRoot}/thumb/${fileId}/${img}`;
  }

  getThumbnail(fileId: string, img: string): Observable<Blob> {
    const endpoint = `${apiRoot}/thumb/${fileId}/${img}`;
    return this.http.get(endpoint, { responseType: 'blob'});
  }

  getThumbnailList(fileId: string): Observable<string[]> {
    const endpoint = `${apiRoot}/thumblist/${fileId}`;
    return this.oboe.get(endpoint)
      .pipe(map(x => <string[]>x));
  }
}
