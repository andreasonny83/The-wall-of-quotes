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
    styles: [`
      .icon {
        display: flex;
        align-items: center;
      }
      .share-wrapper {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-around;
        box-sizing: border-box;
        margin-top: 5px;
        padding: 4px 0 0;
        height: 25px;
        overflow: hidden;
        background: rgba(51, 51, 51, 0.2);
        box-shadow: inset 0 5px 15px -7px rgba(0,0,0,.4),
                    inset 0 -5px 15px -7px rgba(0,0,0,.4);
        transition: all .15s cubic-bezier(0, 0, 0.2, 1);
      }
      .share-wrapper:hover {
        height: 52px;
        padding: 10px 0;
      }
      .icon .color {
        fill: rgba(0, 0, 0, 0.2);
        transition: fill .15s linear;
      }
      .icon-facebook:hover .color {
        fill: #4D6FA9;
      }
      .icon-twitter:hover .color {
        fill: #76A9EA;
      }
      .icon-google:hover .color {
        fill: #DC4E41;
      }
    `],
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
