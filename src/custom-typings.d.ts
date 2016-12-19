/**
 * angular2-sonny-webpack
 *
 * Copyright 2016, Andrea Sonny, All rights reserved.
 *
 * @author: Andrea Sonny <andreasonny83@gmail.com>
 */

// support NodeJS modules without type definitions
declare module '*';

declare var ENV: string;

interface GlobalEnvironment {
  ENV: string;
}

// Extend typings
interface Global extends GlobalEnvironment  { }
