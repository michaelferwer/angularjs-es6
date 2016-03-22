import React from 'react';
import { connect } from 'react-redux';
import { ButtonToolbar, ButtonGroup, Button, Panel, Image, Row, Col, Input } from 'react-bootstrap';
import { removeBookToCart, setBookNumberToCart, fetchOffersIfNeeded } from '../actions';

export class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.props.onFetchOffersIfNeeded();
  }

  componentWillUpdate(nextProps, nextState){
    if(!nextProps.cart.isFetch){
      this.props.onFetchOffersIfNeeded();
    }
  }

  /**
   * Compute the price with books in cart
   *
   * @returns {number}
   */
  computePrice(){
    var amount = 0;
    for(var isbn in this.props.cart.purchase){
      var purchaseItem = this.props.cart.purchase[isbn];
      amount += purchaseItem.number * purchaseItem.book.price;
    }
    var bestOffer = amount;
    for(var index in this.props.cart.offers){
      var offer = this.props.cart.offers[index];
      var tmpAmount = amount;
      switch (offer.type) {
        case 'percentage':
          tmpAmount = amount - offer.value * amount / 100;
          break;
        case 'minus':
          tmpAmount = amount - offer.value;
          break;
        case 'slice':
          tmpAmount = amount - Math.floor((amount / offer.sliceValue)) * offer.value;
          break;
        default :
          break;
      }
      if(tmpAmount < bestOffer){
        bestOffer = tmpAmount;
      }
    }
    return bestOffer;
  }

  onHandleChange(book, event) {
    this.props.onSetBookNumberToCart(book, event.target.value);
  }

  renderPurchaseItems() {
    let result = new Array();
    for (var key in this.props.cart.purchase) {
      let purchaseItem = this.props.cart.purchase[key];
      result.push(<Panel className="purchase-item-cart" key={key}>
                    <Row>
                      <Col xs={4}>
                        <Image className="cover-item-cart" src={purchaseItem.book.cover}/>
                      </Col>
                      <Col xs={8}>
                        <Button className="glyphicon glyphicon-remove btn-danger btn-xs right" onClick={this.props.onRemoveBook.bind(this,purchaseItem.book)} />
                        <div className="clear"></div>
                        <div className="vertical-align-text">
                          <h4 className="title-item-cart">{purchaseItem.book.title}</h4>
                          <Row>
                            <Col xs={6}>
                              <b>Price :</b>
                            </Col>
                            <Col xs={6} className="text-align-right">
                              {purchaseItem.book.price}&#8364;
                            </Col>
                          </Row>
                          <Row>
                            <Col xs={6}>
                              <b>Quantity :</b>
                            </Col>
                            <Col xs={6}>
                              <Input className="text-align-right"
                                     type="number"
                                     step="1"
                                     value={purchaseItem.number}
                                     onChange={ this.onHandleChange.bind(this, purchaseItem.book)}/>
                            </Col>
                          </Row>
                        </div>
                      </Col>
                    </Row>
                  </Panel>);
    }
    return result;
  }

  render() {
    return (
      <div>
        <h1 className="center-text">Cart</h1>
        {this.renderPurchaseItems()}
        <h3>Subtotal : {this.computePrice()}&#8364;</h3>
      </div>);
  }
}

function mapStateToProps(state) {
  return {cart: state.cart};
}

function mapDispatchToProps(dispatch) {
  return {
    onRemoveBook: (book) => dispatch(removeBookToCart(book)),
    onSetBookNumberToCart: (book, number) => dispatch(setBookNumberToCart(book, number)),
    onFetchOffersIfNeeded: () => dispatch(fetchOffersIfNeeded())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
