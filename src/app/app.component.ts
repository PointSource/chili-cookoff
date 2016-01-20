import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {ChilisComponent} from './chili/chilis.component';
import {ChiliDetailComponent} from './chili/chili-detail.component';
import {DashboardComponent} from './dashboard.component';
import {ChiliService} from './chili/chili.service';
import {VoteComponent} from './voting/vote.component'

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html',
  styleUrls: ['app/app.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [ChiliService]
})
@RouteConfig([
  // {path: '/', redirectTo: ['Dashboard'] },
  {path: '/dashboard', name: 'Dashboard', component: DashboardComponent, useAsDefault: true},
  {path: '/chilis', name: 'Chilis', component: ChilisComponent},
  {path: '/chili/:id', name: 'ChiliDetail', component: ChiliDetailComponent},
  {path: '/chili/:id/vote', name: 'ChiliVote', component: VoteComponent},
])
export class AppComponent {
  public title = 'Tour of Chilis';
}