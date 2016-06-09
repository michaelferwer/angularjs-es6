import angular from 'angular';

export default angular.module('app.components.hello', [])
.component('greetUser', {
    template: 'Hello, {{$ctrl.user}}!',
    controller: function GreetUserController() {
      this.user = 'world';
    }
  }).name;