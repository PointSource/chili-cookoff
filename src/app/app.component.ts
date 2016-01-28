import {Component, OnInit} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {ResultsComponent} from './results/results.component';
import {ChiliDetailComponent} from './chili/chili-detail.component';
import {ChiliListComponent} from './chili/chili-list.component';
import {RatingComponent} from './rating/rating.component'
import {JudgeSelectorComponent} from './judges/judge-selector.component'

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html',
  styleUrls: ['app/app.component.css'],
  directives: [ROUTER_DIRECTIVES, JudgeSelectorComponent]
})
@RouteConfig([
  {path: '/dashboard', name: 'Dashboard', component: ChiliListComponent, useAsDefault: true },
  {path: '/results', name: 'Results', component: ResultsComponent},
  {path: '/chili/:id', name: 'ChiliDetail', component: ChiliDetailComponent},
  {path: '/chili/:id/vote', name: 'ChiliVote', component: RatingComponent}
])
export class AppComponent {
	public title = 'Cookoff!!';
}