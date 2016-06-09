import angular from 'angular';

class CatalogServices {
  constructor($q, $http) {
    this._$q = $q;
    this._$http = $http;
  }

  getBooks() {
    let deferred = this._$q.defer();
    this._$http.get('http://henri-potier.xebia.fr/books', {cache: true})
      .success(data => {
        deferred.resolve(data);
      })
      .error(err => deferred.reject('Error due to retrieve catalog'));
    return deferred.promise;
  }
}

export default angular.module('app.services.catalog', [])
  .service('catalogServices', CatalogServices)
  .name;