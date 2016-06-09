routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
    .state('cart', {
      url: '/cart',
      template: 'Cart',
      controller: 'CartController',
      controllerAs: 'cart'
    });
}