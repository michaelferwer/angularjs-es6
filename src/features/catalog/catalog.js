import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './catalog.routes';
import CatalogController from './catalog.controller';
import catalogServices from '../../services/catalog/catalog.services';
import cartServices from '../../services/cart/cart.services';

export default angular.module('app.features.catalog', [uirouter, catalogServices, cartServices])
  .config(routing)
  .controller('CatalogController', CatalogController)
  .name;
