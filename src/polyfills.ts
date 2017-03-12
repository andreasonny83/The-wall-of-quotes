/**
 * the-wall-of-quotes
 *
 * Copyright 2016-2017, Andrea Sonny, All rights reserved.
 *
 * @author: Andrea Sonny <andreasonny83@gmail.com>
 */

 // import 'ie-shim'; // Internet Explorer 9 support

 import 'core-js/es6';
 import 'core-js/es7/reflect';
 import 'zone.js/dist/zone';

 // Typescript emit helpers polyfill
 import 'ts-helpers';

 if ('production' === ENV) {
  // Production

} else {
  // Development

  Error['stackTraceLimit'] = Infinity;

  /* tslint:disable no-var-requires */
  require('zone.js/dist/long-stack-trace-zone');
}
