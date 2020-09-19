import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { DirectoryKind, FileKind, DetailKind, SeriesDirectory } from 'src/app/modules/shared/models/Files';
import { API_ROUTE_OPTIONS } from '../routes';
import PromiseStatus from '../../shared/models/PromiseStatus';
import { ResultData, FolderPathData, RecentlyChangedData } from '../../shared/models/GenericData';
import { SeriesOptions, SeriesOptionUpdate } from '../../shared/models/SeriesOptions';
import ServerLoad from '../../shared/models/ServerLoad';
import VIDEO_LISTS from '../../shared/models/VideoLists.enum';
import { VariableRoutingService } from './variable-routing.service';

@Injectable({
  providedIn: 'root'
})
export class FileListService {
  constructor(private http: HttpClient, private variableRoutingService: VariableRoutingService) { }

  getDirectoryListing(rel: string): Observable<FileKind[]> {
    const encodedDir = encodeURIComponent(rel);
    const url = `${this.getRoute(API_ROUTE_OPTIONS.GET_BROWSE)}/${encodedDir}`;
    return this.http.get<FileKind[]>(url);
  }

  getRecent(): Observable<RecentlyChangedData> {
    const url = this.getRoute(API_ROUTE_OPTIONS.GET_RECENT);
    return this.http.get<RecentlyChangedData>(url);
  }

  search(query: string): Observable<FileKind[]> {
    return of(null);
  }

  getFileDetail(rel: string, refresh?: boolean): Observable<DetailKind> {
    const params = (refresh === true) ?
      new HttpParams().set('refresh', 'plz') :
      new HttpParams();

    const encodedRelPath = encodeURIComponent(rel);
    const url = `${this.getRoute(API_ROUTE_OPTIONS.GET_FILE_DETAILS)}/${encodedRelPath}`;
    return this.http.get<DetailKind>(url, { params });
  }

  getPromiseStatus(promiseId: string): Observable<PromiseStatus> {
    const encodedPromiseId = encodeURIComponent(promiseId);
    const url = `${this.getRoute(API_ROUTE_OPTIONS.GET_PENDING_RESOURCE_STATUS)}/${encodedPromiseId}`;
    return this.http.get<PromiseStatus>(url);
  }

  getSeriesOptions(rel: string): Observable<SeriesOptions> {
    const encodedRelPath = encodeURIComponent(rel);
    const url = `${this.getRoute(API_ROUTE_OPTIONS.GET_SERIES_OPTIONS)}/${encodedRelPath}`;
    return this.http.get<SeriesOptions>(url);
  }

  updateSeriesOption(rel: string, aniListId: number): Observable<SeriesDirectory> {
    const updateReq: SeriesOptionUpdate = {
      folder: rel,
      aniListId: aniListId
    };

    return this.http.put<SeriesDirectory>(this.getRoute(API_ROUTE_OPTIONS.UPDATE_SERIES_OPTION), updateReq);
  }

  getServerLoad(): Observable<ServerLoad> {
    const url = this.getRoute(API_ROUTE_OPTIONS.GET_SERVER_LOAD);
    return this.http.get<ServerLoad>(url);
  }

  // list type
  getList(listType: VIDEO_LISTS): Observable<DirectoryKind[]> {
    const url = `${this.getRoute(API_ROUTE_OPTIONS.GET_IN_LIST)}/${listType}`;
    return this.http.get<DirectoryKind[]>(url);
  }

  getInList(listType: VIDEO_LISTS, rel: string): Observable<ResultData> {
    const encodedDir = encodeURIComponent(rel);
    const url = `${this.getRoute(API_ROUTE_OPTIONS.GET_IN_LIST)}/${listType}/${encodedDir}`;
    return this.http.get<ResultData>(url);
  }

  toggleListItem(listType: VIDEO_LISTS, rel: string, status: boolean): Observable<ResultData> {
    if (status === true) {
      return this.addToList(listType, rel);
    }
    else {
      return this.deleteFromList(listType, rel);
    }
  }

  addToList(listType: VIDEO_LISTS, rel: string): Observable<ResultData> {
    const url = `${this.getRoute(API_ROUTE_OPTIONS.ADD_TO_LIST)}/${listType}`;
    const data: FolderPathData = { folder: rel };
    return this.http.post<ResultData>(url, data);
  }

  deleteFromList(listType: VIDEO_LISTS, rel: string): Observable<ResultData> {
    const encodedDir = encodeURIComponent(rel);
    const url = `${this.getRoute(API_ROUTE_OPTIONS.DEL_FROM_LIST)}/${listType}/${encodedDir}`;
    return this.http.delete<ResultData>(url);
  }

  getRecentlyChangedInFolder(rel: string): Observable<FileKind[]> {
    const encodedRelPath = encodeURIComponent(rel);
    const url = `${this.getRoute(API_ROUTE_OPTIONS.GET_RECENTLY_CHANGED)}/${encodedRelPath}`;
    return this.http.get<FileKind[]>(url);
  }

  private getRoute(route: string) {
    return this.variableRoutingService.resolveRoute(route);
  }
}