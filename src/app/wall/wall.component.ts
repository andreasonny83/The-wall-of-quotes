import { Component,
         ViewChild,
         ElementRef,
         HostListener,
         OnInit }         from '@angular/core';

import { Observable }     from 'rxjs';
import { FirebaseListObservable,
         AngularFire }     from 'angularfire2';

import { ConstantService } from  '../services/config';

import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'wall',
  styleUrls: ['./wall.component.css'],
  templateUrl: './wall.component.html'
})
export class WallComponent implements OnInit {
  private mutationObserver: MutationObserver;
  private nativeElement: HTMLElement;
  private busy: boolean = true;

  public highlight: string;
  public oldies: string;
  // Limit to latest 100 records only
  public limit: number = 100;
  public latest: FirebaseListObservable<any[]>;
  public quotes: FirebaseListObservable<any[]>;
  public quoteLimit = new Subject<number>();

  // @HostListener('scroll') private scrollHandler() {
  //   if (this.busy) return;
  //
  //   if (this.nativeElement.scrollTop + this.nativeElement.offsetHeight >
  //       this.nativeElement.scrollHeight - 100) {
  //     this.busy = true;
  //     this.limit += 50;
  //     this.quoteLimit.next(this.limit);
  //   }
  // }

  constructor(private af: AngularFire, element: ElementRef) {
    this.nativeElement = element.nativeElement;
  }

  ngOnInit(): void {
    let self = this;

    self.highlight = 'Latest quotes';
    self.oldies = 'Our quotes';

    self.latest = self.af.database.list('/quotes', {
      query: { orderByChild: 'time', limitToFirst: 6 }
    });
  }

  ngAfterContentInit(): void {
    let self    = this;
    let lastNew = new Subject();

    // self.mutationObserver = new MutationObserver(() => {
    //   self.nativeElement.scrollTop = 0;
    // });
    //
    // self.mutationObserver.observe(this.nativeElement, {
    //   attributes: true
    // });

    self.quotes = self.af.database.list('/quotes', {
      query: {
        orderByChild: 'time',
        limitToFirst: self.quoteLimit,
        startAt: lastNew
      }
    });

    self.latest.subscribe(snapshots => {
      this.quoteLimit.next(self.limit);
      lastNew.next(snapshots.pop().time);
    });
  }

  layoutComplete(): void {
    this.busy = false;
  }
}
