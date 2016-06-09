export default class CatalogController {
  constructor(catalogServices, cartServices) {
    this.catalogServices = catalogServices;
    this.cartServices = cartServices;
    this.books = {};
    this.getBooks();
  }

  getBooks() {
    var self = this;
    this.catalogServices.getBooks()
      .then(data => {
        self.books = data;
      })
      .catch(err => {
        console.log(err)
      });
  }

  addBook(book){
    this.cartServices.addBook(book);
  }
}

CatalogController.$inject = ['catalogServices','cartServices'];