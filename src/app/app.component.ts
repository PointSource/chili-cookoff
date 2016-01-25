import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {ChilisComponent} from './chili/chilis.component';
import {ResultsComponent} from './results/results.component';
import {ChiliDetailComponent} from './chili/chili-detail.component';
import {DashboardComponent} from './dashboard.component';
import {VoteComponent} from './voting/vote.component'

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html',
  styleUrls: ['app/app.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
  {path: '/dashboard', name: 'Dashboard', component: DashboardComponent, useAsDefault: true},
  {path: '/results', name: 'Results', component: ResultsComponent},
  {path: '/chilis', name: 'Chilis', component: ChilisComponent},
  {path: '/chili/:id', name: 'ChiliDetail', component: ChiliDetailComponent},
  {path: '/chili/:id/vote', name: 'ChiliVote', component: VoteComponent}
])
export class AppComponent {
  public title = 'Tour of Chilis';
}