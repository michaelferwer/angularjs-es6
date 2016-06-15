routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
    .state('cart', {
      url: '/cart',
      template: require('./cart.html'),
      controller: 'CartController',
      controllerAs: 'cart'
    });
}