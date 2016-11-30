import angular from 'angular';
import uirouter from 'angular-ui-router';

import hello from './hello/hello';

export default angular.module('app.components', [uirouter, hello])
  .name;
