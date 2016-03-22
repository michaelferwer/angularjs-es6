import fetch from 'isomorphic-fetch';

export const REQUEST_CATALOG = 'REQUEST_CATALOG';
export const RECEIVE_CATALOG = 'RECEIVE_CATALOG';
export const ADD_BOOK_TO_CART = 'ADD_BOOK_TO_CART';
export const REMOVE_BOOK_TO_CART = 'REMOVE_BOOK_TO_CART';
export const LOAD_CART_FROM_STORAGE = 'LOAD_CART_FROM_STORAGE';
export const SET_BOOK_NUMBER = 'SET_BOOK_NUMBER';
export const REQUEST_OFFERS = 'REQUEST_OFFERS';
export const RECEIVE_OFFERS = 'RECEIVE_OFFERS';

/**
 * Request catalog
 *
 * @returns {{type: string, data: *}}
 */
function requestCatalog() {
  return { type: REQUEST_CATALOG }
}

/**
 * Receive catalog data to display it
 *
 * @param data
 * @returns {{type: string, data: *}}
 */
function receiveCatalog(data) {
  return { type: RECEIVE_CATALOG, data }
}

/**
 * Fetch catalog if needed
 *
 * @returns {Function}
 */
export function fetchCatalogIfNeeded(){
  return function (dispatch,getState){
    if(shouldFetchCatalog(getState().catalog)) {
      return fetchCatalog(dispatch, getState().catalog);
    }
    else{
      return Promise.resolve();
    }
  };
}

/**
 * Determine if catalog need to be fetched
 *
 * @param state
 * @returns {boolean}
 */
function shouldFetchCatalog(state){
  return !state.isFetch && !state.isFetching;
}

/**
 * Fetch catalog
 *
 * @returns {Promise.<T>}
 */
function fetchCatalog(dispatch,state){
  // start fetching data
  dispatch(requestCatalog());

  // retrieve catalog
  return fetch('http://henri-potier.xebia.fr/books')
    .then(response => response.json())
    .then(json => dispatch(receiveCatalog(json)))
    .catch(err => {
      console.log('Error due to retrieve catalog',err);
    });
}

/**
 * Add book to cart
 *
 * @param book
 * @returns {{type: string, book: *}}
 */
export function addBookToCart(book){
  return {type: ADD_BOOK_TO_CART, book};
}

/**
 * Remove book to cart and update offers
 *
 * @param book
 * @returns {{type: string, book: *}}
 */
export function removeBookToCart(book){
  return {type: REMOVE_BOOK_TO_CART, book};
}

/**
 * Set book number to cart
 *
 * @param book
 * @param number
 * @returns {{type: string, book: *, number: int}}
 */
export function setBookNumberToCart(book, number){
  return {type: SET_BOOK_NUMBER, book, number};
}

/**
 * Action send when we retrieve cart in localStorage
 *
 * @param cart
 * @returns {{type: string, cart: *}}
 */
export function loadCartFromLocalStorage(cart){
  return {type : LOAD_CART_FROM_STORAGE, cart};
}

/**
 * Action send when offers are requested
 *
 * @returns {{type: string}}
 */
function requestOffers(){
  return { type: REQUEST_OFFERS };
}

/**
 * Action send when offers are received
 *
 * @param data
 * @returns {{type: string, data: *}}
 */
function receiveOffers(data){
  return { type: RECEIVE_OFFERS, data };
}

/**
 * Fetch offers if needed
 *
 * @returns {Function}
 */
export function fetchOffersIfNeeded(){
  return function (dispatch,getState){
    if(shouldFetchOffers(getState().cart)) {
      return fetchOffers(dispatch, getState().cart);
    }
    else{
      return Promise.resolve();
    }
  };
}

/**
 * Determine if we should fetch offers
 *
 * @param state
 * @returns {boolean}
 */
function shouldFetchOffers(state){
  return !state.isFetch && !state.isFetching;
}

/**
 * Fetch offers
 *
 * @param dispatch
 * @param state
 * @returns {*}
 */
function fetchOffers(dispatch, state){
  dispatch(requestOffers());

  // if there is no books in cart, no need to fetch offers, return an empty array
  if(Object.keys(state.purchase).length < 1){
    return dispatch(receiveOffers([]));
  }

  var books = "";
  var keys = Object.keys(state.purchase);
  for(var index in keys){
    books += state.purchase[keys[index]].book.isbn;
    if(index < keys.length - 1){
      books += ',';
    }
  }
  // retrieve offers
  return fetch('http://henri-potier.xebia.fr/books/'+books+'/commercialOffers')
    .then(response => response.json())
    .then(json => dispatch(receiveOffers(json.offers)))
    .catch(err => {
       console.log('Error due to retrieve offers',err);
     });
}
