import {provide} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {ChiliService} from './chili/chili.service';
import {CategoryService} from './voting/category.service';
import {VoteService} from './voting/vote.service';
import {AppComponent} from './app.component';

bootstrap(AppComponent, [
  ROUTER_PROVIDERS,
  ChiliService,
  CategoryService,
  VoteService,
  provide(LocationStrategy, {useClass: HashLocationStrategy})
]);