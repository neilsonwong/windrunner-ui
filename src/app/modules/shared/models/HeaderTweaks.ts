import { Subject } from 'rxjs';

export default interface HeaderTweaks {
  compact: Subject<boolean>;
  transparent: Subject<boolean>;
  banner: Subject<string>;
};
