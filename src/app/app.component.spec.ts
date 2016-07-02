import {
  it,
  inject,
  beforeEachProviders
} from '@angular/core/testing';

// to use Translate Service, we need Http, and to test Http we need to mock the backend
import {
  defaultApolloClient,
  Angular2Apollo
} from 'angular2-apollo';
import apolloClient from './client';
import { AuthService } from './shared';
import { provide } from '@angular/core';

// Load the implementations that should be tested
import { AppComponent } from './app.component';

describe('App', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEachProviders(() => [
    AppComponent,
    AuthService,
    // You can use this to provide a mocked apolloClient instance for testing.
    // As of now we just use the default instance.
    provide(Angular2Apollo, {
      useFactory: function useFactory(backend, defaultOptions) {
        return defaultApolloClient(apolloClient)
      },
      deps: []
    })
  ]);

  it('should have an url', inject([AppComponent], (app: AppComponent) => {
    expect(app.url).toEqual('https://scaphold.io');
  }));

});
