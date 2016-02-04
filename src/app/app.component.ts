import {Component, Inject} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {JudgeComponent} from './judges/judge.component'
import {ChiliListComponent} from './chili/chili-list.component';
import {CategoryService} from './rating/category.service';
import {RatingService} from './rating/rating.service';

@Component({
	selector: 'my-app',
	templateUrl: 'app/app.component.html',
	styleUrls: ['app/app.component.css'],
  	directives: [
		ROUTER_DIRECTIVES
	],
	providers: [
		CategoryService, 
		RatingService
	]
})
@RouteConfig([
	{ path: '/judges', name: 'Judges', component: JudgeComponent, useAsDefault: true },
	{ path: '/chilis', name: 'Chilis', component: ChiliListComponent },
	
	// { path: '/chili/:id', name: 'ChiliVote', component: RatingComponent }
	// { path: '/results', name: 'Results', component: ResultsComponent },
	// { path: '/chili/:id', name: 'ChiliDetail', component: ChiliDetailComponent },
])

export class AppComponent {
	public title = 'Cookoff!!';

	constructor(
		@Inject('AppStore') private _appStore: AppStore
	) {}

}