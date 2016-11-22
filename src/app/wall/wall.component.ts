import { Component,
         ViewChild,
         Renderer,
         Inject,
         Input,
         EventEmitter } from '@angular/core';

import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'wall',
  styleUrls: ['./wall.component.css'],
  templateUrl: './wall.component.html'
})
export class WallComponent {
  private highlight: string;
  private oldies: string;
  private quotes: FirebaseListObservable<any[]>;
  model: any;

  constructor(private af: AngularFire,
              private renderer: Renderer) {
    this.resetForm();

    this.quotes = af.database.list('/quotes');
  }

  private resetForm(): void {
    this.model = {
      quote: '',
      author: '',
      creator: ''
    };
  }

  /**
   * [ngOnInit description]
   *
   * @return {[type]} [description]
   */
  private ngOnInit(): void {
    this.highlight = 'Today\'s quotes';
    this.oldies = 'Our quotes';
  }

  private addQuote(): void {
    if (this.model.quote &&
        this.model.author &&
        this.model.creator) {
      this.quotes.push(this.model);

      this.resetForm();
    }
  }
}
