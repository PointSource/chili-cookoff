import {Component, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';
import {ChiliService} from './chili.service';
import {Chili} from './chili';

@Component({
  selector: 'my-chilis',
  templateUrl: 'app/chili/chilis.component.html',
  styleUrls: ['app/chili/chilis.component.css']
})
export class ChilisComponent implements OnInit {
  public chilis: Chili[];
  public selectedHero: Chili;

  constructor(private _heroService: ChiliService, private _router: Router) { }

  getChilis() {
    this._heroService.getChilis().then(chilis => this.chilis = chilis);
  }

  gotoDetail() {
    this._router.navigate(['HeroDetail', { id: this.selectedHero.id }]);
  }

  ngOnInit() {
    this.getChilis();
  }

  onSelect(chili: Chili) { this.selectedHero = chili; }
}
