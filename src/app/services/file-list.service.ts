import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { OboeWrapper } from '../utils/oboeWrapper';

import { FileData } from '../models/FileData';

const apiRoot = 'http://localhost:8000/api/v2';

@Injectable({
  providedIn: 'root'
})
export class FileListService {

  constructor(private http: HttpClient,
    private oboe: OboeWrapper) { 
  }

  getDirectoryList(directory: string): Observable<FileData[]> {
    const endpoint = `${apiRoot}/ls/${directory}`;
    return this.http.get<FileData[]>(endpoint);
  }

  getRecent(): Observable<FileData[]> {
    const endpoint = `${apiRoot}/recent`;
    return this.oboe.get(endpoint)
      .pipe(map(x => <FileData[]>x));
  }
  
  getPinned(): Observable<FileData[]> {
    const endpoint = `${apiRoot}/pins`;
    return this.http.get<FileData[]>(endpoint);
  }

  search(query: string): Observable<FileData[]> {
    return of(null);
  }

  streamTest(): Observable<string[]> {
    const endpoint = `${apiRoot}/streamTest`;
    return this.oboe.get(endpoint)
      .pipe(map(x => <string[]>x));
  }

}
