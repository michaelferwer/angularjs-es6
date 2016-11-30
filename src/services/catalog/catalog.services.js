import angular from 'angular';

class CatalogServices {
  constructor($http) {
    this._$http = $http;
  }

  getBooks() {
    return this._$http.get('http://henri-potier.xebia.fr/books', {cache: true})
      .then(response => {
        return response.data;
      }, err => {
        console.error('Error due to retrieve catalog', err);
        return {};
      });
  }
}

export default angular.module('app.services.catalog', [])
  .service('catalogServices', CatalogServices)
  .name;