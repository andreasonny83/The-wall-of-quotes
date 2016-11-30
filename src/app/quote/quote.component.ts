import { Component, Input, OnInit } from '@angular/core';

export interface Quote {
  copy: string,
  author: string,
  creator: string
}

@Component({
 selector: 'quote-component',
 styleUrls: ['./quote.component.css'],
 templateUrl: './quote.component.html'
})
export class QuoteComponent implements OnInit {
  @Input() copy: string = '';
  @Input() author: string = '';
  @Input() creator: string = '';

  public quote: Quote;

  constructor() { }

  ngOnInit(): void {
    this.quote = {
      copy: this.copy,
      author: this.author,
      creator: this.creator,
    };
  }
}
