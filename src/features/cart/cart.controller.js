export default class CatalogController {
  constructor($scope, cartServices) {
    this.name = 'Cart';
    this.cartServices = cartServices;
    this.cart = this.cartServices.data;
    // Bind property "bestOffer" of cartServices at this controller
    $scope.$watch( angular.bind(this, function () {
                     return this.cartServices.bestOffer;
                   }),
                   angular.bind(this, function ( bestOffer ) {
                     this.bestOffer = bestOffer;
                   }));
    // Fetch offers
    this.fetchOffersAndComputeBestOffer();
    this.nbBooks = Object.keys(this.cart.purchase).length;
  }

  fetchOffersAndComputeBestOffer(){
    this.cartServices.fetchOffers();
  }

  changeQuantity(item){
    this.cartServices.setBookNumber(item.book, item.number);
    this.fetchOffersAndComputeBestOffer();
  }

  removeBook(item){
    this.cartServices.removeBook(item.book);
    this.nbBooks = Object.keys(this.cart.purchase).length;
    this.fetchOffersAndComputeBestOffer();
  }
}