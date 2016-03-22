import { combineReducers } from 'redux';
import * as actions from './actions';
import LocalStorageManager from './lib/LocalStorageManager';

/**
 * Define initial state for each entity
 */
const initialCatalog = {books: [], isFetch: false, isFetching: false};

const initialCart = {purchase: {}, offers: [], isFetch: false, isFetching: false};

/**
 * Reduce function for the catalog
 *
 * @param state
 * @param action
 */
function catalog(state = initialCatalog, action = {}) {
  switch (action.type) {
    case actions.REQUEST_CATALOG:
      return Object.assign({}, state, {
        isFetching: true
      });
      break;
    case actions.RECEIVE_CATALOG:
      return Object.assign({}, state, {
        isFetching: false,
        isFetch: true,
        books: action.data
      });
      break;
    default:
      return state;
  }
}

/**
 * Reduce function for the cart
 *
 * @param state
 * @param action
 */
function cart(state = initialCart, action = {}) {
  var book;
  switch (action.type) {
    case actions.ADD_BOOK_TO_CART:
      book = action.book;
      if (state.purchase.hasOwnProperty(book.isbn)) {
        state.purchase[book.isbn].number++;
      }
      else {
        state.purchase[book.isbn] = {book, number: 1};
        state.isFetch = false;
      }
      LocalStorageManager.saveCart(state);
      return Object.assign({}, state);
      break;
    case actions.REMOVE_BOOK_TO_CART:
      book = action.book;
      if (state.purchase.hasOwnProperty(book.isbn)) {
        delete state.purchase[book.isbn];
        state.isFetch = false;
        LocalStorageManager.saveCart(state);
      }
      return Object.assign({}, state);
      break;
    case actions.SET_BOOK_NUMBER:
      book = action.book;
      var number = parseInt(action.number);
      if (state.purchase.hasOwnProperty(book.isbn)) {
        // quantity must be greater than zero, min value is 1
        if(!isNaN(number)){
          state.purchase[book.isbn].number = number < 1 ? 1 : number;
          state.purchase[book.isbn].number = state.purchase[book.isbn].number > 100 ? 100 : state.purchase[book.isbn].number;
        }
        else{
          state.purchase[book.isbn].number = 1;
        }
        LocalStorageManager.saveCart(state);
      }
      return Object.assign({}, state);
      break;
    case actions.LOAD_CART_FROM_STORAGE:
      return action.cart;
      break;
    case actions.REQUEST_OFFERS:
      return Object.assign({}, state, {
        isFetching: true
      });
      break;
    case actions.RECEIVE_OFFERS:
      var newState = Object.assign({}, state, {
        isFetching: false,
        isFetch: true,
        offers: action.data
      });
      LocalStorageManager.saveCart(newState);
      return newState;
      break;
    default:
      return state;
  }
}

export {cart as cartReducer };

const libraryApp = combineReducers({catalog, cart});

export default libraryApp;
