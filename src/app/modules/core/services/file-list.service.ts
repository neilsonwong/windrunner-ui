import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { DirectoryKind, FileKind, DetailKind } from 'src/app/modules/shared/models/Files';
import { API_ROUTES } from '../routes';
import PromiseStatus from '../../shared/models/PromiseStatus';


@Injectable({
  providedIn: 'root'
})
export class FileListService {
  constructor(private http: HttpClient) { }

  getDirectoryListing(rel: string): Observable<FileKind[]> {
    const encodedDir = encodeURIComponent(rel);
    const url = `${API_ROUTES.GET_BROWSE}/${encodedDir}`;
    return this.http.get<FileKind[]>(url);
  }

  getRecent(): Observable<DirectoryKind[]> {
    const url = API_ROUTES.GET_RECENT;
    return this.http.get<DirectoryKind[]>(url);
  }

  getFavourites(): Observable<DirectoryKind[]> {
    const url = API_ROUTES.GET_FAVOURITES;
    return this.http.get<DirectoryKind[]>(url);
  }

  search(query: string): Observable<FileKind[]> {
    return of(null);
  }

  getFileDetail(rel: string): Observable<DetailKind> {
    const encodedRelPath = encodeURIComponent(rel);
    const url = `${API_ROUTES.GET_FILE_DETAILS}/${encodedRelPath}`;
    return this.http.get<DetailKind>(url);
  }

  getPromiseStatus(promiseId: string): Observable<PromiseStatus> {
    const encodedPromiseId = encodeURIComponent(promiseId);
    const url = `${API_ROUTES.GET_PENDING_RESOURCE_STATUS}/${encodedPromiseId}`;
    return this.http.get<PromiseStatus>(url);
  }
}
