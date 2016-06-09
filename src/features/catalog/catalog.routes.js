routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
    .state('catalog', {
      url: '/catalog',
      template: require('./catalog.html'),
      controller: 'CatalogController',
      controllerAs: 'catalog'
    });
}