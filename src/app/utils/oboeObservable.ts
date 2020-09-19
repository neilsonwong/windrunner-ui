import { Oboe } from 'oboe';
import { Observable } from 'rxjs';

export class OboeObservable<T> extends Observable<T> {
  private stream: Oboe;

  constructor(oboeStream: Oboe) {
    super((obs) => {
      oboeStream.node("!", item => obs.next(item));
      // stream.done(obs.complete);
      obs.add((e) => { 
        oboeStream.abort();
      });
      oboeStream.fail((e) => {
        obs.error('oboe stream failed');
      });
    });
    this.stream = oboeStream;
  }

  public abort() {
    this.stream.abort();
  }
}