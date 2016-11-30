import angular from 'angular';
import localStorageManager from '../../helpers/LocalStorage';

class CartServices {
  constructor($http) {
    this._$http = $http;
    this.data = localStorageManager.loadCartIfPresent();
    this.bestOffer = 0;
  }

  addBook(book){
    if(this.data.purchase.hasOwnProperty(book.isbn)){
      this.data.purchase[book.isbn].number ++;
    }
    else{
      this.data.purchase[book.isbn] = {book, number: 1};
    }
    localStorageManager.saveCart(this.data);
  }

  removeBook(book){
    if(this.data.purchase.hasOwnProperty(book.isbn)){
      delete this.data.purchase[book.isbn];
    }
    localStorageManager.saveCart(this.data);
  }

  setBookNumber(book, number){
    if(isNaN(number) || number < 1 || number > 100){
      number = 1;
    }
    if(this.data.purchase.hasOwnProperty(book.isbn)){
      this.data.purchase[book.isbn].number = number;
    }
    localStorageManager.saveCart(this.data);
  }

  computeBestOffer(){
    localStorageManager.saveCart(this.data);
    var amount = 0;
    for(let index in this.data.purchase){
      let item = this.data.purchase[index];
      amount += item.book.price * item.number;
    }
    var bestOffer = amount;
    for(let index in this.data.offers){
      let offer = this.data.offers[index];
      let possibleBestOffer = this.computePriceWithOffer(amount, offer);
      if(possibleBestOffer < bestOffer){
        bestOffer = possibleBestOffer;
      }
    }
    this.bestOffer = bestOffer;
  }

  computePriceWithOffer(amount, offer){
    switch (offer.type) {
      case 'percentage':
        return amount - offer.value * amount / 100;
        break;
      case 'minus':
        return amount - offer.value;
        break;
      case 'slice':
        return amount - Math.floor((amount / offer.sliceValue)) * offer.value;
        break;
      default :
        break;
    }
  }

  fetchOffers(){
    var books = '';
    var keys = Object.keys(this.data.purchase);
    // if there is no book in cart, no need to call webservice
    // just return a promise with empty array
    if(keys.length <= 0) {
      this.data.offers = [];
      this.computeBestOffer();
      return;
    }

    for(var index in keys){
      books += this.data.purchase[keys[index]].book.isbn;
      if(index < keys.length - 1){
        books += ',';
      }
    }
    this._$http.get('http://henri-potier.xebia.fr/books/'+books+'/commercialOffers', {cache: true})
      .then(response => {
        this.data.offers = response.data.offers;
        this.computeBestOffer();
      }, err => {
        console.error('Error due to retrieve catalog', err);
        this.data.offers = [];
      });
  }
}

export default angular.module('app.services.cart', [])
  .service('cartServices', CartServices)
  .name;