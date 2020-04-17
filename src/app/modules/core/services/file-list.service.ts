import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DirectoryKind, FileKind, DetailKind } from 'src/app/modules/shared/models/Files';

const api = environment.api;

@Injectable({
  providedIn: 'root'
})
export class FileListService {
  constructor(private http: HttpClient) { }

  getDirectoryListing(rel: string): Observable<FileKind[]> {
    const encodedDir = encodeURIComponent(rel);
    const url = `${api}/browse/${encodedDir}`;
    return this.http.get<FileKind[]>(url);
  }

  getRecent(): Observable<DirectoryKind[]> {
    const url = `${api}/recent`;
    return this.http.get<DirectoryKind[]>(url);
  }

  getFavourites(): Observable<DirectoryKind[]> {
    const url = `${api}/favs`;
    return this.http.get<DirectoryKind[]>(url);
  }

  search(query: string): Observable<FileKind[]> {
    return of(null);
  }

  getFileDetail(rel: string): Observable<DetailKind> {
    const encodedRelPath = encodeURIComponent(rel);
    const url = `${api}/details/${encodedRelPath}`;
    return this.http.get<DetailKind>(url);
  }
}
