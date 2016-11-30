import { Component,
         ViewChild,
         OnInit }         from '@angular/core';

import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs';
import { FirebaseListObservable,
         AngularFire }     from 'angularfire2';

import { ReCaptchaComponent } from 'angular2-recaptcha/lib/captcha.component';

import { ConstantService } from  '../services/config';

@Component({
  selector: 'wall',
  styleUrls: ['./wall.component.css'],
  templateUrl: './wall.component.html'
})
export class WallComponent implements OnInit {
  @ViewChild(ReCaptchaComponent)
    public captcha: ReCaptchaComponent;

  public highlight: string;
  public oldies: string;
  public model: any;
  public reCaptchaKey: string = '6LdL0AwUAAAAAMocAirWnZylU1XEOmkTV3Zx77ZZ';
  public quotes: FirebaseListObservable<any[]>;

  constructor(private af: AngularFire, private http: Http) { }

  ngOnInit(): void {
    this.highlight = 'Today\'s quotes';
    this.oldies = 'Our quotes';

    this.quotes = this.af.database.list('/quotes');

    this.resetForm();
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

    this.captcha.reset();
  }

  private addQuote(): any {
    var self = this;

    if (this.model.quote &&
        this.model.author &&
        this.model.captcha &&
        this.model.creator) {

      return this.http
                 .post(`${ConstantService.API_URL}/add`, this.model)
                 .toPromise()
                 .then((response: Response) => {
                   self.resetForm();
                   alert('Your quote has been published!');
                 })
                 .catch();
    }
  }
}
