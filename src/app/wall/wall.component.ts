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
  templateUrl: './wall.component.html',
})
export class WallComponent implements OnInit {
  public highlight: string;
  public theWall: string;
  public quotes: FirebaseListObservable<any[]>;
  public bricks: any[] = [];

  public loadMore: boolean;
  private lastRecord: number;
  private loadedRecords: number = 0;
  private subject: Subject<Number>;

  constructor(private af: AngularFire) {
    this.highlight = 'Quotes of the day';
    this.theWall = 'The Wall';
    this.loadMore = true;
    this.subject = new Subject();

    this.quotes = this.af.database.list('/quotes', {
        query: {
          orderByChild: 'time',
          // limitToFirst: this.subject,
      }
    });
  }

  public ngOnInit(): void {
    this.quotes.subscribe(
      (val: any) => {
        this.loadMore = false;
      },
      (err: any) => console.log('Error.', err),
    );

    // this.loadMoreData();
  }

  // public loadMoreData() {
  //   this.loadedRecords += 5;
  //
  //   setTimeout(() => {
  //     this.subject.next(this.loadedRecords);
  //     // this.loadMoreData();
  //   }, 1500);
  // }
}
