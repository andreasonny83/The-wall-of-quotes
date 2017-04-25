import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';

import '../public/css/styles.css';

@Component({
  selector: 'app',
  template: `
  <sn-header class="header"></sn-header>

  <wall></wall>

  <floating-form [class.cookieLawSeen]="cookieLawSeen"></floating-form>

  <cookie-law #cookieLaw (isSeen)="cookieLawSeen = $event"></cookie-law>

  <simple-notifications></simple-notifications>
  `
})
export class AppComponent implements OnInit {
  @ViewChild('cookieLaw') private cookieLawEl: any;

  private cookieLawSeen: boolean;
  private images: boolean;

  constructor() { }

  public ngOnInit() {
    this.cookieLawSeen = this.cookieLawEl.cookieLawSeen;
  }
}
