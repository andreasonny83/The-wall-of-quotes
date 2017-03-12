import {
  Component,
  OnInit,
  Input,
  ViewEncapsulation
} from '@angular/core';

import {
  DomSanitizer,
  SafeHtml
} from '@angular/platform-browser';

import {
  defaultIcons,
  Icons
} from './icons';

@Component({
    selector: '[share-component], share-component',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./share.component.css'],
    template: `
      <div class="share-wrapper">
        <a href="#"
           (click)="share('fb', 'https://the-wall-of-quotes.firebaseapp.com/', 'my title', 'my desc')">
          <i class="icon icon-facebook" *ngIf="facebook" [innerHTML]="facebookSvg"></i>
        </a>
        <a href="#"
           (click)="share('tw', 'https://the-wall-of-quotes.firebaseapp.com/', 'my title', 'my desc')">
          <i class="icon icon-twitter" *ngIf="twitter" [innerHTML]="twitterSvg"></i>
        </a>
        <a href="#"
           (click)="share('go', 'https://the-wall-of-quotes.firebaseapp.com/', 'my title', 'my desc')">
          <i class="icon icon-google" *ngIf="google" [innerHTML]="googleSvg"></i>
        </a>
      </div>
      `
})
export class ShareComponent implements OnInit {
  @Input() public facebook: any;
  @Input() public twitter: any;
  @Input() public google: any;
  @Input() public quote: any;

  public item: string;

  private facebookSvg: SafeHtml;
  private twitterSvg: SafeHtml;
  private googleSvg: SafeHtml;
  private icons: Icons = defaultIcons;
  private winHeight: number = 350;
  private winWidth: number = 520;

  constructor(private _sanitizer: DomSanitizer) {
    this.item = this.item || 'empty';
  }

  public ngOnInit(): void {
    this.facebookSvg = this._sanitizer.bypassSecurityTrustHtml(this.icons.facebook);
    this.twitterSvg = this._sanitizer.bypassSecurityTrustHtml(this.icons.twitter);
    this.googleSvg = this._sanitizer.bypassSecurityTrustHtml(this.icons.google);
  }

  public share(social: string, quoteUrl: string, title: string): boolean {
    let winLeft = (screen.width / 2) - (this.winWidth / 2);
    let winTop =  (screen.height / 2) - (this.winHeight / 2);

    let linkUrl: string;

    let popupPos = 'top=' + winTop +
                   ',left=' + winLeft +
                   ',toolbar=0,status=0,width=' + this.winWidth +
                   ',height=' + this.winHeight;

    switch (social) {
      case 'fb': linkUrl = 'http://www.facebook.com/sharer.php?s=100' +
                           '&p[title]=' + title +
                           '&p[summary]=' + this.quote +
                           '&p[url]=' + quoteUrl;
                 break;
      case 'tw': linkUrl = `https://twitter.com/intent/tweet?text=${this.quote}`;
                 break;
      default: break;
    }

    window.open(linkUrl, 'sharer', popupPos);

    // Prevent link action
    return false;
  }
}
