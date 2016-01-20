import {Component, OnInit} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {Chili} from './chili';
import {HeroService} from './hero.service';

@Component({
  selector: 'my-hero-detail',
  templateUrl: 'app/hero/hero-detail.component.html',
  styleUrls: ['app/hero/hero-detail.component.css'],
  inputs: ['hero']
})
export class HeroDetailComponent implements OnInit {
  public hero: Chili;

  constructor(private _heroService: HeroService,
    private _routeParams: RouteParams) {
  }

  ngOnInit() {
    if (!this.hero) {
      let id = +this._routeParams.get('id');
      this._heroService.getHero(id).then(hero => this.hero = hero);
    }
  }

  goBack() {
    window.history.back();
  }
}