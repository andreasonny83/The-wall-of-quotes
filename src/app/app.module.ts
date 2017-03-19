import { NgModule }                  from '@angular/core';
import { BrowserModule }             from '@angular/platform-browser';
import { RouterModule }              from '@angular/router';
import { FormsModule }               from '@angular/forms';
import { HttpModule }                from '@angular/http';

import { AngularFireModule }         from 'angularfire2';
import { ReCaptchaModule }           from 'angular2-recaptcha';
import { SimpleNotificationsModule } from 'angular2-notifications/components';
import { MasonryModule }             from 'angular2-masonry';
import { CookieLawModule }           from 'angular2-cookie-law';
import { ShareModule }               from './share-module';

import { ConstantService }           from  './services/config';

import { AppComponent }              from './app.component';
import { SnHeaderComponent }         from './header/header.component';
import { WallComponent }             from './wall/wall.component';
import { QuoteComponent }            from './quote/quote.component';
import { BrickComponent }            from './brick/brick.component';
import { FloatingFormComponent }     from './floating-form/floating-form.component';
import { SortCardsPipe }             from './services/pipes';

// Must export the config
export const firebaseConfig = {
  apiKey: ConstantService.API_KEY,
  authDomain: ConstantService.AUTH_DOMAIN,
  databaseURL: ConstantService.DB,
  storageBucket: ConstantService.BUCKET
};

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    SimpleNotificationsModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    ReCaptchaModule,
    MasonryModule,
    ShareModule,
    CookieLawModule,
  ],
  declarations: [
    AppComponent,
    SnHeaderComponent,
    WallComponent,
    QuoteComponent,
    BrickComponent,
    FloatingFormComponent,
    SortCardsPipe,
  ],
  providers: [
    ConstantService,
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }
