import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

const api = environment.api;

@Injectable({
  providedIn: 'root'
})
export class UserPrefService {

  constructor(private http: HttpClient) {
  }

  addFavourite(folder: string): Observable<boolean> {
    const endpoint = `${api}/pins/add`;
    return this.http.post(endpoint, folder, { observe: 'response', responseType: 'text' })
      .pipe(map(resp => {
        return resp.status === 201;
      }));
  }

  removeFavourite(folder: string): Observable<boolean> {
    const endpoint = `${api}/pins/del`;
    return this.http.post(endpoint, folder, { observe: 'response', responseType: 'text' })
      .pipe(map(resp => {
        return resp.status === 200;
      }));
  }

  notifyPlay(fileId: string): Observable<boolean> {
    const endpoint = `${api}/watch`;
    return this.http.post(endpoint, fileId, { observe: 'response', responseType: 'text' })
      .pipe(map(resp => {
        return resp.status === 200;
      }));
  }
}
