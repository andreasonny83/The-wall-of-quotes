import { Component,
         ViewChild,
         OnInit }             from '@angular/core';

import { Http, Response }     from '@angular/http';

import { ReCaptchaComponent } from 'angular2-recaptcha/lib/captcha.component';

import { ConstantService }    from  '../services/config';

export interface Model {
  quote: string,
  author: string,
  creator: string,
  captcha: string
}

@Component({
 selector: 'floating-form',
 styleUrls: ['./floating-form.component.css'],
 templateUrl: './floating-form.component.html'
})
export class FloatingFormComponent {
  @ViewChild(ReCaptchaComponent)
    public captcha: ReCaptchaComponent;

  public model: Model;
  public formClass: string = '';
  public reCaptchaKey: string = '6LdL0AwUAAAAAMocAirWnZylU1XEOmkTV3Zx77ZZ';

  constructor(private http: Http) { }

  ngOnInit(): void {
    this.resetForm();
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

  private toggleForm(): void {
    this.resetForm();
    this.formClass = this.formClass ? '' : 'show';
  }

  private handleCorrectCaptcha(token: string): void {
    this.model.captcha = token;
  }

  private addQuote(): any {
    var self = this;

    if (this.model.quote &&
        this.model.author &&
        this.model.captcha &&
        this.model.creator) {

      this.toggleForm();

      return this.http
                 .post(`${ConstantService.API_URL}/add`, this.model)
                 .toPromise()
                 .then((response: Response) => {
                   self.resetForm();
                   alert('Your quote has been published!');
                 })
                 .catch(() => {
                   alert('Ops! Something went wrong. We\'re unable to publish your quote right now. Please, try again later.');
                 });
    }
  }
}
