import { Component,
         ViewChild,
         OnInit }             from '@angular/core';

import { Http, Response }     from '@angular/http';

import { ReCaptchaComponent } from 'angular2-recaptcha/lib/captcha.component';

import { ConstantService }    from  '../services/config';

import { NotificationsService, SimpleNotificationsComponent } from 'angular2-notifications';

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
  public wait: boolean = false;
  public formClass: string = '';
  public reCaptchaKey: string = '6LdL0AwUAAAAAMocAirWnZylU1XEOmkTV3Zx77ZZ';

  constructor(private http: Http,
              private _service: NotificationsService) { }

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

  /**
   * Close the floating form when
   * clicking outside
   */
  private closeForm(evt: any): void {
    if (evt.target.className === 'floating-form show') {
      this.toggleForm();
    }
  }

  /**
   * [toggleForm description]
   *
   * @param {boolean = true} reset Reset the form only when the form opens
   */
  private toggleForm(reset: boolean = true): void {
      this.wait = false;
      reset && this.resetForm();
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

      this.wait = true;

      return this.http
                 .post(`${ConstantService.API_URL}/add`, this.model)
                 .toPromise()
                 .then((response: Response) => {
                   self.toggleForm(false);
                   self._service
                       .success(
                         'Success',
                         'Your quote has been published!',
                         {timeOut: 5000});
                 })
                 .catch(() => {
                   self.toggleForm(false);
                   self._service
                       .error(
                         'Error',
                         'Ops! Something went wrong. We\'re unable to publish your quote right now. Please, try again later.',
                         {timeOut: 5000});
                 });
    }
  }
}
