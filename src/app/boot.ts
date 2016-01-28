import {provide} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {ChiliService} from './chili/chili.service';
import {CategoryService} from './rating/category.service';
import {RatingService} from './rating/rating.service';
import {JudgeService} from './judges/judge.service';
import {AppComponent} from './app.component';

bootstrap(AppComponent, [
  ROUTER_PROVIDERS,
  ChiliService,
  CategoryService,
  RatingService,
  JudgeService,
  provide(LocationStrategy, {useClass: HashLocationStrategy})
]);