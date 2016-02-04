import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {JudgeComponent} from './judges/judge.component'
import {ChiliModuleComponent} from './chili/chili-module.component';
// import {RatingComponent} from './rating/rating.component';

@Component({
	selector: 'my-app',
	templateUrl: 'app/app.component.html',
	styleUrls: ['app/app.component.css'],
  	directives: [
		ROUTER_DIRECTIVES
	]
})
@RouteConfig([
	{ path: '/judges', name: 'Judges', component: JudgeComponent, useAsDefault: true },
	{ path: '/chilis/...', name: 'Chilis', component: ChiliModuleComponent },
	// { path: '/results', name: 'Results', component: ResultsComponent },
])

export class AppComponent {
	public title = 'Cookoff!!';
}