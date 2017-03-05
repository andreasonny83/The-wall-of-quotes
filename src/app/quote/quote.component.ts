import {
  Component,
  Input,
} from '@angular/core';

export interface Quote {
  quote: string;
  author: string;
  creator: string;
}

@Component({
 selector: 'quote-component',
 styleUrls: ['./quote.component.css'],
 templateUrl: './quote.component.html'
})
export class QuoteComponent {
  @Input() public quote: Quote;

  constructor() { }
}
