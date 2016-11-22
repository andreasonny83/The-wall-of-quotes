import { Component, Input } from '@angular/core';

import { ConstantService } from  '../services/config';

@Component({
  selector: 'sn-header',
  styleUrls: ['./header.component.css'],
  templateUrl: './header.component.html'
})
export class SnHeaderComponent {
  @Input() isLoggedIn:boolean = false;

  private env: string = null;
  private title: string;

  constructor() {
    this.title = 'The Wall Of Quotes';
  }
}
