import React from 'react';
import { connect } from 'react-redux';
import { Button, Grid, Row, Col, Thumbnail, Image } from 'react-bootstrap';
import { fetchCatalogIfNeeded, addBookToCart } from '../actions';
import NotificationSystem  from 'react-notification-system';

class Catalog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.props.onFetchCatalogIfNeeded();
  }

  onAddBookToCartAndNotify(book) {
    this.props.onAddBookToCart(book);
    this.refs.notificationSystem.addNotification({
      message: 'The book "' + book.title + '" is added in your cart',
      level: 'success'
    });
  }

  renderBooks() {
    let books = [];
    for (var index = 0; index < this.props.catalog.books.length; index++) {
      let book = this.props.catalog.books[index];
      books.push(<Col key={book.isbn} xs={12} sm={6} md={4}>
                   <Thumbnail className="">
                     <div>
                       <Image className="book-cover center-container" src={book.cover} responsive/>
                       <h4 className="center-text">{book.title}</h4>
                       <div>ISBN : {book.isbn}</div>

                       <div>
                         <p className="left vertical-align-text align-text size-md">
                           <b>price : </b>{book.price}&#8364;</p>
                         <Button className="btn-warning right"
                                 onClick={this.onAddBookToCartAndNotify.bind(this,book)}>
                           <Image className="small-icon" src="img/cart.png"/>
                           Add to cart
                         </Button>

                         <div className="clear"/>
                       </div>
                     </div>
                   </Thumbnail>
                 </Col>);
    }
    return <Row>{books}</Row>;
  }

  render() {
    return (
      <div>
        <div>
          <h1 className="center-text">Catalog</h1>
        </div>

        <NotificationSystem ref="notificationSystem"/>
        <Grid>
          {this.renderBooks()}
        </Grid>
      </div>);
  }
}

function mapStateToProps(state) {
  return {catalog: state.catalog, cart: state.cart};
}

function mapDispatchToProps(dispatch) {
  return {
    onFetchCatalogIfNeeded: () => dispatch(fetchCatalogIfNeeded()),
    onAddBookToCart: (book) => dispatch(addBookToCart(book))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Catalog);
