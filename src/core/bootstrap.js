/*jshint browser:true */
'use strict';

//require('./vendor.js')();
//var appModule = require('../js/app');

import appModule from '../app';

angular.element(document).ready(function () {
  angular.bootstrap(document, [appModule.name], {
    //strictDi: true
  });
});