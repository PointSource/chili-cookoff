import {Component, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';
import {Chili} from './hero/chili';
import {HeroService} from './hero/hero.service';

@Component({
  selector: 'my-dashboard',
  templateUrl: 'app/dashboard.component.html',
  styleUrls: ['app/dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public heroes: Chili[] = [];

  constructor(private _heroService: HeroService, private _router: Router) { }

  ngOnInit() {
    this._heroService.getHeroes().then(heroes => this.heroes = heroes.slice(1,5));
  }

  gotoDetail(hero: Chili) {
    this._router.navigate(['HeroDetail', { id: hero.id }]);
  }
}