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
  private offline: boolean = false;

  public highlight: string;
  public oldies: string;
  // Limit to latest 100 records only
  public limit: number = 100;
  public latest: FirebaseListObservable<any[]>;
  public quotes: FirebaseListObservable<any[]>;
  public quoteLimit = new Subject<number>();

  public mocks = [
    { quote: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', author: 'author-1', creator: 'creator-1' },
    { quote: 'quote-2', author: 'author-2', creator: 'creator-2' },
    { quote: 'quote-3', author: 'author-3', creator: 'creator-3' },
    { quote: 'quote-4', author: 'author-4', creator: 'creator-4' },
    { quote: 'quote-5', author: 'author-5', creator: 'creator-5' },
    { quote: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', author: 'author-6', creator: 'creator-6' },
    { quote: 'quote-7', author: 'author-7', creator: 'creator-7' },
    { quote: 'quote-8', author: 'author-8', creator: 'creator-8' },
    { quote: 'quote-9', author: 'author-9', creator: 'creator-9' },
    { quote: 'quote-10', author: 'author-10', creator: 'creator-10' },
  ];

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

    // Offline support
    self.offline = false;

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
