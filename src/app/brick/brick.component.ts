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
 selector: 'brick-component',
 styleUrls: ['./brick.component.css'],
 templateUrl: './brick.component.html'
})
export class BrickComponent {
  @Input() public quote: Quote;
}
