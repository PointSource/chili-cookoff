import {provide} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {AppComponent} from './app.component';

import {createStore} from '../lib/redux.js'
import {rootReducer} from './root.reducer';
import {JudgeActions} from './judges/judge.actions'

const appStore = createStore(rootReducer);


bootstrap(AppComponent, [
  ROUTER_PROVIDERS,
  provide(LocationStrategy, {useClass: HashLocationStrategy}),
  provide('AppStore', { useValue: appStore }),
  JudgeActions
]);