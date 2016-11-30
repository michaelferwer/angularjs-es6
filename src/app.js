// Need polyfill for jasmin
import "babel-polyfill";
// hack for bootstrap
var $ = require('jquery');
window.$ = $;
window.jQuery = $;
require('bootstrap');

import _ from 'underscore';
import angular from 'angular';
import angularMessageFormat from 'angular-message-format';
import angularTranslate from 'angular-translate';
import angularTranslateInterpolation from 'angular-translate-interpolation-messageformat';

import angularSanitize from 'angular-sanitize';
import uirouter from 'angular-ui-router';
import features from 'features/index';
import components from 'components/index';

// load good angular locale file
var supportedLanguages = ["fr-fr","fr","en-gb"];
if(navigator.languages && (navigator.languages[0] === 'fr-fr' || navigator.languages[0] === 'fr') ){
  require ('angular-i18n/angular-locale_fr');
}
else {
  require ('angular-i18n/angular-locale_en-gb');
}

angular.module('app',[uirouter, features, components, angularMessageFormat, angularTranslate, angularTranslateInterpolation, angularSanitize])
  .config(function routing($urlRouterProvider, $translateProvider) {
    $urlRouterProvider.otherwise('/catalog');
    for(let supportedLanguage of supportedLanguages){
      $translateProvider.translations(supportedLanguage, require('./resources/locale-'+supportedLanguage+'.json'));
    }
    $translateProvider.useMessageFormatInterpolation();
    $translateProvider.useSanitizeValueStrategy('sanitize');

    $translateProvider.determinePreferredLanguage(function () {
      return  navigator.languages && _.contains(supportedLanguages, navigator.languages[0].toLowerCase()) ? navigator.languages[0].toLowerCase() : 'fr-fr';
    });
  });
