import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import * as oboe from 'oboe';

@Injectable({
  providedIn: 'root'
})
export class OboeWrapper {
    constructor(){}
    
    get(params) {
        return new Observable(obs => {
          const stream = oboe(params);
          stream.node("!", item => obs.next(item));
          // stream.done(obs.complete);
          stream.fail(obs.error);
        });
    }
}