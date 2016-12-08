import { Component } from '@angular/core';

import '../../public/css/styles.css';

@Component({
  selector: 'app',
  template: `
  <sn-header class="header"></sn-header>

  <wall></wall>
  `
})
export class AppComponent { }
