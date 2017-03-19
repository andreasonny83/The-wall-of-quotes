import {
  Component,
  Input,
} from '@angular/core';

import {
  ConstantService
} from  '../services/config';

@Component({
  selector: 'sn-header',
  styleUrls: ['./header.component.css'],
  templateUrl: './header.component.html'
})
export class SnHeaderComponent {
  @Input() public isLoggedIn: boolean = false;

  public title: string;
  public version: string;

  private env: string = null;

  constructor() {
    this.title = 'The Wall Of Quotes';
    this.version = `v.${ConstantService.VERSION}`;
  }
}
