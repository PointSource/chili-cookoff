import {Component, OnInit} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {Chili} from '../chili/chili';
import {Category} from './category';
import {ChiliService} from '../chili/chili.service';

@Component({
  selector: 'vote',
  templateUrl: 'app/voting/vote.component.html',
  styleUrls: ['app/voting/vote.component.css']
})
export class VoteComponent implements OnInit {
  public chili: Chili;
  public categories: Category[] = [
    {
      id: 1,
      name: 'Most Spicy',
      adjective: 'Spiciness'
    },
    {
      id: 2,
      name: 'Most Meaty',
      adjective: 'Meat Content'
    },
    {
      id: 3,
      name: 'Most Original',
      adjective: 'Originality'
    },
    {
      id: 4,
      name: 'Most Tasty',
      adjective: 'Overall Taste'
    }
  ];
  public enableSubmit = true;

  constructor(private _chiliService: ChiliService,
    private _routeParams: RouteParams) {
  }

  ngOnInit() {
    if (!this.chili) {
      let id = +this._routeParams.get('id');
      this._chiliService.getChili(id).then(chili => {
        console.log(chili);
        this.chili = chili
      });
    }
  }
}