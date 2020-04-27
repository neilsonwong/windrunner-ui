import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { DirectoryKind, FileKind, DetailKind, SeriesDirectory } from 'src/app/modules/shared/models/Files';
import { API_ROUTES } from '../routes';
import PromiseStatus from '../../shared/models/PromiseStatus';
import { ResultData, FolderPathData, RecentlyChangedData } from '../../shared/models/GenericData';
import { SeriesOptions, SeriesOptionUpdate } from '../../shared/models/SeriesOptions';
import ServerLoad from '../../shared/models/ServerLoad';
import VIDEO_LISTS from '../../shared/models/VideoLists.enum';

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

  getRecent(): Observable<RecentlyChangedData> {
    const url = API_ROUTES.GET_RECENT;
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
    const url = `${API_ROUTES.GET_FILE_DETAILS}/${encodedRelPath}`;
    return this.http.get<DetailKind>(url, { params });
  }

  getPromiseStatus(promiseId: string): Observable<PromiseStatus> {
    const encodedPromiseId = encodeURIComponent(promiseId);
    const url = `${API_ROUTES.GET_PENDING_RESOURCE_STATUS}/${encodedPromiseId}`;
    return this.http.get<PromiseStatus>(url);
  }

  getSeriesOptions(rel: string): Observable<SeriesOptions> {
    const encodedRelPath = encodeURIComponent(rel);
    const url = `${API_ROUTES.GET_SERIES_OPTIONS}/${encodedRelPath}`;
    return this.http.get<SeriesOptions>(url);
  }

  updateSeriesOption(rel: string, aniListId: number): Observable<SeriesDirectory> {
    const updateReq: SeriesOptionUpdate = {
      folder: rel,
      aniListId: aniListId
    };

    return this.http.put<SeriesDirectory>(API_ROUTES.UPDATE_SERIES_OPTION, updateReq);
  }

  getServerLoad(): Observable<ServerLoad> {
    const url = API_ROUTES.GET_SERVER_LOAD;
    return this.http.get<ServerLoad>(url);
  }

  // list type
  getList(listType: VIDEO_LISTS): Observable<DirectoryKind[]> {
    const url = `${API_ROUTES.GET_IN_LIST}/${listType}`;
    return this.http.get<DirectoryKind[]>(url);
  }

  getInList(listType: VIDEO_LISTS, rel: string): Observable<ResultData> {
    const encodedDir = encodeURIComponent(rel);
    const url = `${API_ROUTES.GET_IN_LIST}/${listType}/${encodedDir}`;
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
    const url = `${API_ROUTES.ADD_TO_LIST}/${listType}`;
    const data: FolderPathData = { folder: rel };
    return this.http.post<ResultData>(url, data);
  }

  deleteFromList(listType: VIDEO_LISTS, rel: string): Observable<ResultData> {
    const encodedDir = encodeURIComponent(rel);
    const url = `${API_ROUTES.DEL_FROM_LIST}/${listType}/${encodedDir}`;
    return this.http.delete<ResultData>(url);
  }

  pruneThumbnails(): Observable<any> {
    const url = API_ROUTES.IMG_PRUNE_THUMBNAIL;
    return this.http.post<ResultData>(url, {});
  }
}