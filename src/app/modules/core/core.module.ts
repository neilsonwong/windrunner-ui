import { NgModule, Optional, SkipSelf } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { FileListService } from './services/file-list.service';
import { HeaderTweakService } from './services/header-tweak.service';
import { PendingResourceRetrievalService } from './services/pending-resource-retrieval.service';
import { ImageResolverService } from './services/image-resolver.service';
import { AgentService } from './services/agent.service';
import { VisibilityService } from './services/visibility.service';
import { LocalStorageService } from './services/local-storage.service';
import { VariableRoutingService } from './services/variable-routing.service';

import { OAuthModule, OAuthStorage } from 'angular-oauth2-oidc';
import { authStorageFactory } from './oauth-storage';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    OAuthModule.forRoot(
      {
      resourceServer: {
          allowedUrls: [
            `${environment.agent}${environment.proxyPrefix}${environment.apiPrefix}`,
            `${environment.api}${environment.apiPrefix}`
          ],
          sendAccessToken: true
      }
  }
  )
  ],
  providers: [
    FileListService,
    AgentService,
    HeaderTweakService,
    PendingResourceRetrievalService,
    ImageResolverService,
    VisibilityService,
    LocalStorageService,
    VariableRoutingService,
    { provide: OAuthStorage, useFactory: authStorageFactory }
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() core: CoreModule) {
    if (core) {
      throw new Error('You shall not pass! CoreModule can only be imported once!!');
    }
  }
}
