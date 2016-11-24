import { Component,
         ViewChild,
         Renderer,
         Inject,
         Input,
         EventEmitter }   from '@angular/core';

import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs';

import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'wall',
  styleUrls: ['./wall.component.css'],
  templateUrl: './wall.component.html',
})
export class WallComponent {
  public highlight: string;
  public oldies: string;
  public model: any;
  public siteKey: string = '6LdL0AwUAAAAAMocAirWnZylU1XEOmkTV3Zx77ZZ';
  public quotes: FirebaseListObservable<any[]>;

  constructor(private af: AngularFire,
              private renderer: Renderer,
              private http: Http) {
    this.resetForm();

    this.quotes = af.database.list('/quotes');
  }

  private handleCorrectCaptcha(token: string): void {
    this.model.captcha = token;
  }

  private resetForm(): void {
    this.model = {
      quote: '',
      author: '',
      creator: '',
      captcha: ''
    };
  }

  /**
   * [ngOnInit description]
   *
   * @return {[type]} [description]
   */
  private ngOnInit(): void {
    this.highlight = 'Today\'s quotes';
    this.oldies = 'Our quotes';
  }

  private addQuote(): any {
    if (this.model.quote &&
        this.model.author &&
        this.model.creator) {

      this.resetForm();

      return this.http
                 .post('https://the-wall-of-quotes-api.herokuapp.com/add', this.model)
                 .toPromise()
                 .then((response: any) => { console.log(response)})
                 .catch();
    }
  }
}
