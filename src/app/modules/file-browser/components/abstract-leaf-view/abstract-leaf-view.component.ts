import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { FileKind, DetailKind } from 'src/app/modules/shared/models/Files';
import { UI_ROUTES } from 'src/app/modules/core/routes';
import { isBaseFile, isDetailKind } from 'src/app/utils/fileTypeUtils';
import { FileListService } from 'src/app/modules/core/services/file-list.service';
import { of, Observable, throwError, Subscription } from 'rxjs';
import { switchMap, retry, tap, delay } from 'rxjs/operators';
import PromiseStatus from 'src/app/modules/shared/models/PromiseStatus';

@Component({ template: '' })
export class AbstractLeafViewComponent implements OnInit, OnDestroy {
  @Input() file: FileKind;
  url: string;
  icon: string;
  retry$: Subscription;

  constructor(protected fileListService: FileListService) { }

  ngOnInit() {
    this.populateValues();

    // determine if we need to requery
    if (isBaseFile(this.file)) {
      if (this.file.promised) {
        // we have a promise waiting for us, let's get it and refresh the details
        // wait 3 seconds and try again

        this.retry$ = this.retryGetFileDetail(5).subscribe({
          error: val => console.log(`${val}: Retried 5 times then quit!`)
        });
      }
    }
  }

  populateValues() {
    // rel contains a slash already
    this.url = `${UI_ROUTES.BROWSE}${this.file.rel}`;
    if (isDetailKind(this.file)) {
      this.icon = this.file.type.toLocaleLowerCase();
    }
  }

  private retryGetFileDetail(retryXTimes): Observable<DetailKind> {
    return of('').pipe(
      delay(this.randomDelay()),
      switchMap(() => this.fileListService.getPromiseStatus(this.file.promised)),
      switchMap((result: PromiseStatus) => {
        if (result.completed) {
          return this.fileListService.getFileDetail(this.file.rel);
        }
        return throwError('Promise Not Ready!');
      }),
      retry(retryXTimes),
      tap((details: DetailKind) => {
          this.file = details;
          this.populateValues();
      })
    );
  }

  private randomDelay(): number {
    //random delay between 1s and 5s
    return 1000 + Math.floor(Math.random() * 4000);
  }

  ngOnDestroy(): void {
    if (this.retry$) {
      this.retry$.unsubscribe();
    }
  }
}