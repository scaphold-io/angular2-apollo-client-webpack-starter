import { enableProdMode } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { ELEMENT_PROBE_PROVIDERS } from '@angular/platform-browser';
import { disableDeprecatedForms, provideForms } from '@angular/forms';

// Our AppComonent and routes
import { AppComponent } from './app/app.component';
import { APP_ROUTER_PROVIDERS } from './app/app.routes';

// Apollo-client
import {
  defaultApolloClient,
  APOLLO_PROVIDERS
} from 'angular2-apollo';
import apolloClient from './app/client';

const ENV_PROVIDERS = [];
// depending on the env mode, enable prod mode or add debugging modules
if (process.env.ENV === 'build') {
  enableProdMode();
} else {
  ENV_PROVIDERS.push(ELEMENT_PROBE_PROVIDERS);
}

const app = bootstrap(AppComponent, [
    // These are dependencies of our App
    APOLLO_PROVIDERS,
    defaultApolloClient(apolloClient),
    APP_ROUTER_PROVIDERS,
    ENV_PROVIDERS,
    disableDeprecatedForms(),
    provideForms()
    // { provide: LocationStrategy, useClass: HashLocationStrategy } // uncomment this to use #/ routes 
  ])
  .catch(err => console.error(err));

export default app;
