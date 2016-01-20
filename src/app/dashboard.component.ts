import {Component, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';
import {Chili} from './chili/chili';
import {ChiliService} from './chili/chili.service';

@Component({
  selector: 'my-dashboard',
  templateUrl: 'app/dashboard.component.html',
  styleUrls: ['app/dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public chilis: Chili[] = [];

  constructor(private _heroService: ChiliService, private _router: Router) { }

  ngOnInit() {
    this._heroService.getChilis().then(chilis => this.chilis = chilis);
  }

  gotoDetail(hero: Chili) {
    this._router.navigate(['ChiliDetail', { id: hero.id }]);
  }

  gotoVote(hero: Chili) {
    this._router.navigate(['ChiliVote', { id: hero.id }]);
  }
}