import { Component, Input, OnInit } from '@angular/core';

export interface Quote {
  quote: string,
  author: string,
  creator: string
}

@Component({
 selector: 'brick-component',
 styleUrls: ['./brick.component.css'],
 templateUrl: './brick.component.html'
})
export class BrickComponent {
  @Input() quote: Quote;

  constructor() { }
}
