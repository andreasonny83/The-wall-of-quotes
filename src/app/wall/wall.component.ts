import {
  Component,
  OnInit,
} from '@angular/core';

import {
  FirebaseObjectObservable,
  FirebaseListObservable,
  AngularFire
} from 'angularfire2';

import {
  Subject,
} from 'rxjs';

@Component({
  selector: 'wall',
  styleUrls: ['./wall.component.css'],
  templateUrl: './wall.component.html'
})
export class WallComponent implements OnInit {
  public highlight: string;
  public theWall: string;
  public loadMore: boolean;
  public quotes: FirebaseListObservable<any[]>;
  public bricks: any[] = [];

  private lastRecord: number;
  private subject: Subject<Number>;

  constructor(private af: AngularFire) {
    this.highlight = 'Quotes of the day';
    this.theWall = 'The Wall';
    this.loadMore = true;
    this.subject = new Subject();

    this.quotes = this.af.database.list('/quotes', {
        query: {
        orderByChild: 'time',
        startAt: this.subject,
        limitToFirst: 5,
      }
    });
  }

  public ngOnInit(): void {
    this.quotes.subscribe(
      (val: any) => {
        if (val.length === 1) {
          console.log('done');
          this.loadMore = false;
        }

        val.forEach((item: any) => {
          if (item.time === this.lastRecord) {
            return;
          }

          this.lastRecord = item.time;
          this.bricks.push(item);
        });
      },

      (err: any) => console.log('Error.', err),
    );

    this.loadMoreData();
  }

  public loadMoreData() {
    setTimeout(() => {
      this.subject.next(this.lastRecord);
      if (this.loadMore) {
        this.loadMoreData();
      }
    }, 3000);
  }
}
