import {Component, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';
import {HeroService} from './hero.service';
import {HeroDetailComponent} from './hero-detail.component';
import {Chili} from './chili';

@Component({
  selector: 'my-heroes',
  templateUrl: 'app/hero/heroes.component.html',
  styleUrls: ['app/hero/heroes.component.css'],
  directives: [HeroDetailComponent]
})
export class HeroesComponent implements OnInit {
  public heroes: Chili[];
  public selectedHero: Chili;

  constructor(private _heroService: HeroService, private _router: Router) { }

  getHeroes() {
    this._heroService.getHeroes().then(heroes => this.heroes = heroes);
  }

  gotoDetail() {
    this._router.navigate(['HeroDetail', { id: this.selectedHero.id }]);
  }

  ngOnInit() {
    this.getHeroes();
  }

  onSelect(hero: Chili) { this.selectedHero = hero; }
}
