import {
  Component,
  OnInit
} from '@angular/core';

import {
  Observable
} from 'rxjs';

import {
  BehaviorSubject,
} from 'rxjs/BehaviorSubject';

import {
  FirebaseObjectObservable,
  FirebaseListObservable,
  AngularFire
} from 'angularfire2';

@Component({
  selector: 'wall',
  styleUrls: ['./wall.component.css'],
  templateUrl: './wall.component.html'
})
export class WallComponent implements OnInit {
  public highlight: string;
  public theWall: string;
  public isReady: boolean = false;
  public quotes: FirebaseListObservable<any[]>;
  public bricks: any[] = [];

  private sizeSubject: BehaviorSubject<Number>;

  constructor(private af: AngularFire) {
    this.highlight = 'Quotes of the day';
    this.theWall = 'The Wall';
    this.sizeSubject = new BehaviorSubject(1);

    this.quotes = this.af.database.list('/quotes', {
        query: {
        orderByChild: 'time',
        limitToFirst: this.sizeSubject
      }
    });
    // .map((array) => {
    //   return array.reverse();
    // }) as FirebaseListObservable<any[]>;
  }

  public ngOnInit(): void {
    setTimeout(() => {
      this.sizeSubject.next(3);
    }, 3000);

    setTimeout(() => {
      this.sizeSubject.next(6);
    }, 4000);

    this.quotes.subscribe(
      (val: any) => {
        this.isReady = true;

        val.forEach((item: any) => {
          this.bricks.push(item);
        });
      },

      (err: any) => console.log('Error.', err),
    );
  }
}
