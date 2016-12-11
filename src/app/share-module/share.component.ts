import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { defaultIcons, Icons } from "./icons"

@Component({
    selector: '[share-component], share-component',
    inputs: [
      'facebook',
      'twitter',
      'google',
      'quote'
    ],
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./share.component.css'],
    template: `
      <div class="share-wrapper">
        <a href="#" (click)="share('fb', 'https://the-wall-of-quotes.firebaseapp.com/', 'my title', 'my desc')">
          <i class="icon icon-facebook" *ngIf="facebook" [innerHTML]="facebookSvg"></i>
        </a>
        <a href="#" (click)="share('tw', 'https://the-wall-of-quotes.firebaseapp.com/', 'my title', 'my desc')">
          <i class="icon icon-twitter" *ngIf="twitter" [innerHTML]="twitterSvg"></i>
        </a>
        <a href="#" (click)="share('go', 'https://the-wall-of-quotes.firebaseapp.com/', 'my title', 'my desc')">
          <i class="icon icon-google" *ngIf="google" [innerHTML]="googleSvg"></i>
        </a>
      </div>
      `
})
export class ShareComponent implements OnInit {
  private facebookSvg: SafeHtml;
  private twitterSvg: SafeHtml;
  private googleSvg: SafeHtml;
  private icons: Icons = defaultIcons;
  public item: string;
  public quote: string;

  winHeight: number = 350;
  winWidth: number = 520;

  constructor(private _sanitizer: DomSanitizer) {
    this.item = this.item || 'empty';
  }

  ngOnInit(): void {
    this.facebookSvg = this._sanitizer.bypassSecurityTrustHtml(this.icons.facebook);
    this.twitterSvg = this._sanitizer.bypassSecurityTrustHtml(this.icons.twitter);
    this.googleSvg = this._sanitizer.bypassSecurityTrustHtml(this.icons.google);
  }

  share(social: string, quoteUrl: string, title: string): boolean {
    let winTop =  (screen.height / 2) - (this.winHeight / 2);
    let winLeft = (screen.width / 2) - (this.winWidth / 2);

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
