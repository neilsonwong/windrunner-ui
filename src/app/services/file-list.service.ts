import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { FileData } from '../models/FileData';
import { OboeWrapper } from '../utils/oboeWrapper';
import { environment } from '../../environments/environment';

const api = environment.api;

@Injectable({
  providedIn: 'root'
})
export class FileListService {

  constructor(private http: HttpClient,
    private oboe: OboeWrapper) { 
  }

  getDirectoryList(directory: string): Observable<FileData[]> {
    const endpoint = `${api}/ls/${directory}`;
    return this.http.get<FileData[]>(endpoint);
  }

  getRecent(): Observable<FileData[]> {
    const endpoint = `${api}/recent`;
    return this.oboe.get(endpoint)
      .pipe(map(x => <FileData[]>x));
  }
  
  getPinned(): Observable<FileData[]> {
    const endpoint = `${api}/pins`;
    return this.http.get<FileData[]>(endpoint);
  }

  search(query: string): Observable<FileData[]> {
    return of(null);
  }

  streamTest(): Observable<string[]> {
    const endpoint = `${api}/streamTest`;
    return this.oboe.get(endpoint)
      .pipe(map(x => <string[]>x));
  }

}
