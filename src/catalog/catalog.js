import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './catalog.routes';
import CatalogController from './catalog.controller';

export default angular.module('app.catalog', [uirouter])
  .config(routing)
  .controller('CatalogController', CatalogController)
  .name;
