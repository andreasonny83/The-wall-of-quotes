import { NgModule }          from '@angular/core';
import { BrowserModule }     from '@angular/platform-browser';
import { RouterModule }      from '@angular/router';
import { FormsModule }       from '@angular/forms';

import { AngularFireModule } from 'angularfire2';

import { AppRoutingModule }  from './app-routing.module';

import { ConstantService }   from  './services/config';

import { AppComponent }      from './app.component';
import { SnHeaderComponent } from './header/header.component';
import { WallComponent }     from './wall/wall.component';

// Must export the config
export const firebaseConfig = {
  apiKey: ConstantService.API_KEY,
  authDomain: ConstantService.AUTH_DOMAIN,
  databaseURL: ConstantService.DB,
  storageBucket: ConstantService.BUCKET,
  messagingSenderId: ConstantService.SENDER_ID
}

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  declarations: [
    AppComponent,
    SnHeaderComponent,
    WallComponent
  ],
  providers: [
    ConstantService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
