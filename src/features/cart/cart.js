import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './cart.routes';
import CartController from './cart.controller';

export default angular.module('app.features.cart', [uirouter])
  .config(routing)
  .controller('CartController', CartController)
  .name;
