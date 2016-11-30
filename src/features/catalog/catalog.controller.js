export default class CatalogController {
  constructor(catalogServices, cartServices) {
    this.catalogServices = catalogServices;
    this.cartServices = cartServices;
    this.books = {};
    this.getBooks();
  }

  getBooks() {
    this.catalogServices.getBooks()
      .then(data => {
        this.books = data;
      })
      .catch(err => {
        console.log(err);
        this.books = {};
      });
  }

  addBook(book){
    this.cartServices.addBook(book);
  }
}

CatalogController.$inject = ['catalogServices','cartServices'];