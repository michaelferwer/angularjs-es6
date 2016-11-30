  import angular from 'angular';
  import uirouter from 'angular-ui-router';

  import routing from './hello.routes';
  import HelloController from './hello.controller'

  export default angular.module('app.components.hello', [uirouter])
    .config(routing)
    .component('hello', {
      template: require('./hello.html'),
      controller: HelloController
    })
    .name;
