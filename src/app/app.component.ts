import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {ChilisComponent} from './chili/chilis.component';
import {DashboardComponent} from './dashboard.component';
import {ChiliService} from './chili/chili.service';

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
])
export class AppComponent {
  public title = 'Tour of Chilis';
}