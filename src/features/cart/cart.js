import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './cart.routes';
import CartController from './cart.controller';
import CartServices from '../../services/cart/cart.services';

export default angular.module('app.features.cart', [uirouter, CartServices])
  .config(routing)
  .controller('CartController', CartController)
  .name;
