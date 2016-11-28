import { Component,
         ViewChild,
         Renderer,
         Inject,
         Input,
         EventEmitter }   from '@angular/core';

import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs';

import { FirebaseListObservable,
         AngularFire }     from 'angularfire2';

import { ConstantService } from  '../services/config';
import { ReCaptchaModule } from 'angular2-recaptcha';

@Component({
  selector: 'wall',
  styleUrls: ['./wall.component.css'],
  templateUrl: './wall.component.html'
})
export class WallComponent {
  @ViewChild('reCaptchaModule') reCaptcha: any;

  public highlight: string;
  public oldies: string;
  public model: any;
  public reCaptchaKey: string = '6LdL0AwUAAAAAMocAirWnZylU1XEOmkTV3Zx77ZZ';
  public quotes: FirebaseListObservable<any[]>;

  constructor(private af: AngularFire,
              private renderer: Renderer,
              private http: Http) { }

  private handleCorrectCaptcha(token: string): void {
    this.model.captcha = token;
  }

  /**
   * [ngOnInit description]
   *
   * @return {[type]} [description]
   */
  ngOnInit(): void {
    this.highlight = 'Today\'s quotes';
    this.oldies = 'Our quotes';

    this.quotes = this.af.database.list('/quotes');

    this.resetForm();
  }

  private resetForm(): void {
    this.model = {
      quote: '',
      author: '',
      creator: '',
      captcha: ''
    };

    // console.log(this.reCaptcha);
    // this.renderer.invokeElementMethod(this.reCaptcha, 'reset');
    // this.reCaptchaModule.getResponse();
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
                  //  console.log(response);
                   self.resetForm();
                 })
                 .catch();
    }
  }
}
