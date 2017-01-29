import { Component, OnInit }       from '@angular/core';

import { Observable }              from 'rxjs';
import { Subject }                 from 'rxjs/Subject';

import { FirebaseObjectObservable,
         FirebaseListObservable,
         AngularFire }             from 'angularfire2';

@Component({
  selector: 'wall',
  styleUrls: ['./wall.component.css'],
  templateUrl: './wall.component.html'
})
export class WallComponent implements OnInit {
  highlight: string;
  theWall: string;
  isReady: boolean = false;
  quotes: FirebaseListObservable<any[]>;

  constructor(private af: AngularFire) {
    this.highlight = 'Quotes of the day';
    this.theWall = 'The Wall';

    this.quotes = this.af.database
                         .list('/quotes', {
                           query: { orderByChild: 'time' }
                         })
                         .map((array) => {
                           return array.reverse();
                         }) as FirebaseListObservable<any[]>;
  }

  ngOnInit(): void {
    this.quotes.subscribe(() => this.isReady = true);
  }
}
