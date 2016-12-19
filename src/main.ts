/**
 * the-wall-of-quotes
 *
 * Copyright 2016, Andrea Sonny, All rights reserved.
 *
 * @author: Andrea Sonny <andreasonny83@gmail.com>
 */

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode }         from '@angular/core';

import { AppModule }              from './app/app.module';

if ('production' === ENV) {
  // Production
  enableProdMode();
}

/*
* Bootstrap our Angular app with a top level NgModule
*/
platformBrowserDynamic().bootstrapModule(AppModule);
