import { Component } from '@angular/core';

import '../manifest.json';
import '../../public/css/styles.css';
import '../../images/touch/homescreen48.png';
import '../../images/touch/homescreen72.png';
import '../../images/touch/homescreen96.png';
import '../../images/touch/homescreen144.png';
import '../../images/touch/homescreen192.png';

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
