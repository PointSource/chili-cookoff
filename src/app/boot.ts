import {provide} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {AppComponent} from './app.component';

import {createStore} from 'redux';
import * as rootReducer from './root.reducer';

const appStore = createStore(rootReducer.default);

bootstrap(AppComponent, [
  ROUTER_PROVIDERS,
  provide(LocationStrategy, {useClass: HashLocationStrategy}),
  provide('AppStore', { useValue: appStore })
]);