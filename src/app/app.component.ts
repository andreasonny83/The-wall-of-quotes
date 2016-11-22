import { Component } from '@angular/core';

import '../../public/css/styles.css';

@Component({
  selector: 'app',
  template: `
  <sn-header class="header"></sn-header>

  <div class="content flex-auto container">
    <router-outlet></router-outlet>
  </div>
  `
})
export class AppComponent { }
