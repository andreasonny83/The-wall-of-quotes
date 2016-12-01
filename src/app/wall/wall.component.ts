import { Component,
         OnInit }         from '@angular/core';

import { Observable }     from 'rxjs';
import { FirebaseListObservable,
         AngularFire }     from 'angularfire2';

import { ConstantService } from  '../services/config';

@Component({
  selector: 'wall',
  styleUrls: ['./wall.component.css'],
  templateUrl: './wall.component.html'
})
export class WallComponent implements OnInit {
  public highlight: string;
  public oldies: string;
  public quotes: FirebaseListObservable<any[]>;

  constructor(private af: AngularFire) { }

  ngOnInit(): void {
    this.highlight = 'Today\'s quotes';
    this.oldies = 'Our quotes';

    this.quotes = this.af.database.list('/quotes');
  }
}
