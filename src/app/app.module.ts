import { NgModule }              from '@angular/core';
import { BrowserModule }         from '@angular/platform-browser';
import { RouterModule }          from '@angular/router';
import { FormsModule }           from '@angular/forms';
import { HttpModule }            from '@angular/http';

import { AngularFireModule }     from 'angularfire2';
import { ReCaptchaModule }       from 'angular2-recaptcha';
import { MasonryModule }         from 'angular2-masonry';

import { AppRoutingModule }      from './app-routing.module';

import { ConstantService }       from  './services/config';

import { AppComponent }          from './app.component';
import { SnHeaderComponent }     from './header/header.component';
import { WallComponent }         from './wall/wall.component';
import { QuoteComponent }        from './quote/quote.component';
import { FloatingFormComponent } from './floating-form/floating-form.component';

// Must export the config
export const firebaseConfig = {
  apiKey: ConstantService.API_KEY,
  authDomain: ConstantService.AUTH_DOMAIN,
  databaseURL: ConstantService.DB,
  storageBucket: ConstantService.BUCKET
}

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    ReCaptchaModule,
    MasonryModule
  ],
  declarations: [
    AppComponent,
    SnHeaderComponent,
    WallComponent,
    QuoteComponent,
    FloatingFormComponent
  ],
  providers: [
    ConstantService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
