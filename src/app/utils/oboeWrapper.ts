import { Injectable } from '@angular/core';
import * as oboe from 'oboe';
import { OboeObservable } from './oboeObservable';

@Injectable({
  providedIn: 'root'
})
export class OboeWrapper {
  constructor() { }

  get<T>(params: any): OboeObservable<T>;
  get(params: any): OboeObservable<any> {
    const stream = oboe(params);
    return new OboeObservable(stream);
  }
}