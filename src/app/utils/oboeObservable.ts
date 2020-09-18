import { Oboe } from 'oboe';
import { Observable } from 'rxjs';

export class OboeObservable<T> extends Observable<T> {
  private stream: Oboe;

  constructor(oboeStream: Oboe) {
    super((obs) => {
      oboeStream.node("!", item => obs.next(item));
      // stream.done(obs.complete);
      obs.add((e) => { 
        console.log('abort mission!');
        oboeStream.abort();
      });
      oboeStream.fail(obs.error);
    });
    this.stream = oboeStream;
  }

  public abort() {
    this.stream.abort();
  }
}