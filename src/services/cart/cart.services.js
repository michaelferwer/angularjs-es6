import angular from 'angular';

class CartServices {
  constructor() {
    this.data = {purchase: {}, offers: [], isFetch: false, isFetching: false};
  }

  addBook(book){
    if(this.data.purchase.hasOwnProperty(book.isbn)){
      this.data.purchase[book.isbn].number ++;
    }
    else{
      this.data.purchase[book.isbn] = {book, number: 1};
    }
  }

  removeBook(book){
    if(this.data.purchase.hasOwnProperty(book.isbn)){
      delete this.data.purchase[book.isbn];
    }
  }

  setBookNumber(book, number){
    if(!isNaN(number) || number < 1 || number > 100){
      number = 1;
    }
    if(this.data.purchase.hasOwnProperty(book.isbn)){
      this.data.purchase[book.isbn].number = number;
    }
  }
}

export default angular.module('app.services.cart', [])
  .service('cartServices', CartServices)
  .name;