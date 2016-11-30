routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
    .state('hello', {
      url: '/hello',
      template: '<hello></hello>'
    });
}
