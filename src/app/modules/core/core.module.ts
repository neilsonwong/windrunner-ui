import { NgModule, Optional, SkipSelf } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { FileListService } from './services/file-list.service';
import { HeaderTweakService } from './services/header-tweak.service';
import { PendingResourceRetrievalService } from './services/pending-resource-retrieval.service';
import { ImageResolverService } from './services/image-resolver.service';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule
  ],
  providers: [
    FileListService,
    HeaderTweakService,
    PendingResourceRetrievalService,
    ImageResolverService,
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() core: CoreModule) {
    if (core) {
      throw new Error('You shall not pass! CoreModule can only be imported once!!');
    }
  }
}
