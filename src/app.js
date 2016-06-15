import bootstrap from 'bootstrap';
import angular from 'angular';
import uirouter from 'angular-ui-router';

import features from 'features/index';

angular.module('app',[uirouter, features])
  .config(function routing($urlRouterProvider) {
    $urlRouterProvider.otherwise('/catalog');
  });