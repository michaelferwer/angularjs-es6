import angular from 'angular';
import uirouter from 'angular-ui-router';

import catalog from './catalog/catalog';

angular.module('app',[uirouter,catalog])
        .config(function routing($urlRouterProvider) {
          $urlRouterProvider.otherwise('/');
        });