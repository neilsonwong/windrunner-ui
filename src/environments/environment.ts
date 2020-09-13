// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api: 'http://127.0.0.1:9876',
  agent: 'http://127.0.0.1:8080',
  proxyPrefix: '/proxy',
  apiPrefix: '/api/v2',
  oauthClientId: '1075060288357-tuvdgpk67uue0djtu73ipognuc9acb6o.apps.googleusercontent.com',
  oauthClientSecret: 'cLp_qcfxEvHLZaB7Qq63hxWC',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
