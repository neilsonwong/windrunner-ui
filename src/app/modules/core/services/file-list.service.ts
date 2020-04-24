import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { DirectoryKind, FileKind, DetailKind, SeriesDirectory } from 'src/app/modules/shared/models/Files';
import { API_ROUTES } from '../routes';
import PromiseStatus from '../../shared/models/PromiseStatus';
import { ResultData, FolderPathData } from '../../shared/models/GenericData';
import { SeriesOptions, SeriesOptionUpdate } from '../../shared/models/SeriesOptions';


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

  getIsFavourite(rel: string): Observable<ResultData> {
    const encodedDir = encodeURIComponent(rel);
    const url = `${API_ROUTES.GET_FAVOURITE}/${encodedDir}`;
    return this.http.get<ResultData>(url);
  }

  setFavourite(rel: string, status: boolean): Observable<ResultData> {
    if (status === true) {
      return this.addFavourite(rel);
    }
    else {
      return this.deleteFavourite(rel);
    }
  }

  addFavourite(rel: string): Observable<ResultData> {
    const url = `${API_ROUTES.ADD_FAVOURITE}`;
    const data: FolderPathData = { folder: rel };
    return this.http.post<ResultData>(url, data);
  }

  deleteFavourite(rel: string): Observable<ResultData> {
    const encodedDir = encodeURIComponent(rel);
    const url = `${API_ROUTES.DEL_FAVOURITE}/${encodedDir}`;
    return this.http.delete<ResultData>(url);
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

  getSeriesOptions(rel: string): Observable<SeriesOptions> {
    // return of(fake);
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
}

const fake = {"results":[{"id":101,"format":"TV","seasonYear":2005,"title":{"romaji":"AIR","english":"Air","native":"AIR"},"synonyms":["Air TV"]},{"id":713,"format":"MOVIE","seasonYear":2005,"title":{"romaji":"Air (Movie)","english":"Air: The Motion Picture","native":"AIR"},"synonyms":["Gekijouban Air"]},{"id":656,"format":"SPECIAL","seasonYear":2005,"title":{"romaji":"AIR in Summer","english":"Air in Summer","native":"AIR イン サマー"},"synonyms":["Air in Summer Special"]},{"id":857,"format":"TV","seasonYear":2006,"title":{"romaji":"Air Gear","english":"Air Gear","native":"エア・ギア"},"synonyms":[]},{"id":101930,"format":"TV","seasonYear":2019,"title":{"romaji":"Girly Air Force","english":"Girly Air Force","native":"ガーリー・エアフォース"},"synonyms":[]},{"id":230,"format":"TV","seasonYear":2003,"title":{"romaji":"Air Master","english":null,"native":"エアマスター"},"synonyms":[]},{"id":3791,"format":"SPECIAL","seasonYear":2007,"title":{"romaji":"AIR GEAR Special","english":null,"native":null},"synonyms":["Air Gear - Special Trick"]},{"id":111790,"format":"OVA","seasonYear":2020,"title":{"romaji":"Haikyuu!! Riku VS Kuu","english":"HAIKYU‼ LAND VS. AIR","native":"ハイキュー‼ 陸 VS 空"},"synonyms":["ボールの\"道\"","Booru no \"Michi\"","The \"Path\" of the Ball","Haikyuu!! OVA"]},{"id":6927,"format":"MOVIE","seasonYear":2009,"title":{"romaji":"Higashi no Eden Soushuuhen: Air Communication","english":"Eden of The East Compilation: Air Communication","native":"東のエデン 総集編 Air Communication"},"synonyms":[]},{"id":1872,"format":"TV_SHORT","seasonYear":2006,"title":{"romaji":"Saru Getchu: On Air","english":"Ape Escape","native":"サルゲッチュ ～オンエアー～"},"synonyms":["Saru! Get You: On Air"]}]};