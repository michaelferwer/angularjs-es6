routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
    .state('catalog', {
      url: '/',
      template: 'hello catalog view',  //require('./catalog.html'),
      controller: 'CatalogController',
      controllerAs: 'catalog'
    });
}