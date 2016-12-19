/**
 * the-wall-of-quotes
 *
 * Copyright 2016, Andrea Sonny, All rights reserved.
 *
 * @author: Andrea Sonny <andreasonny83@gmail.com>
 */

// Look in ./config folder for webpack.dev.js
switch (process.env.NODE_ENV) {
  case 'prod':
  case 'production':
    module.exports = require('./config/webpack.prod')({env: 'production'});
    break;
  case 'test':
  case 'testing':
    module.exports = require('./config/webpack.test')({env: 'test'});
    break;
  case 'dev':
  case 'development':
  default:
    module.exports = require('./config/webpack.dev')({env: 'development'});
}
