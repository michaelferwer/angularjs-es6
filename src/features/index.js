import angular from 'angular';
import uirouter from 'angular-ui-router';

import catalog from './catalog/catalog';
import cart from './cart/cart'

export default angular.module('app.features', [uirouter, catalog, cart])
  .name;