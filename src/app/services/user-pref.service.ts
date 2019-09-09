import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

const apiRoot = 'http://localhost:8000/api/v2';

@Injectable({
  providedIn: 'root'
})
export class UserPrefService {

  constructor(private http: HttpClient) {
  }

  addFavourite(folder: string): Observable<boolean> {
    const endpoint = `${apiRoot}/pins/add`;
    return this.http.post(endpoint, folder, { observe: 'response', responseType: 'text' })
      .pipe(map(resp => {
        return resp.status === 201;
      }));
  }

  removeFavourite(folder: string): Observable<boolean> {
    const endpoint = `${apiRoot}/pins/del`;
    return this.http.post(endpoint, folder, { observe: 'response', responseType: 'text' })
      .pipe(map(resp => {
        return resp.status === 200;
      }));
  }
}
