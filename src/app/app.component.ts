import { Component } from '@angular/core';

import '../public/css/styles.css';

@Component({
  selector: 'app',
  template: `
  <sn-header class="header"></sn-header>

  <wall></wall>

  <floating-form [class.cookieLaw]="cookieLaw"></floating-form>

  <cookie-law></cookie-law>
  `
})
export class AppComponent {
  private cookieLaw: boolean = true;
}
