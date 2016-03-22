import React from 'react';
import {renderIntoDocument, scryRenderedDOMComponentsWithTag} from 'react-addons-test-utils';
import nock from 'nock';

import {expect} from 'chai';
import * as actions from '../src/actions';
import { cartReducer } from '../src/reducers';
import { mockStore } from './mockUtils';

describe('Test : Reducers async actions', () => {
  afterEach(() => {
    nock.cleanAll()
  });

  it('Creates RECEIVE_CATALOG when fetching catalog has been done', (done) => {
    nock('http://henri-potier.xebia.fr/')
      .get('/books')
      .reply(200, [
        {
          "isbn": "c8fabf68-8374-48fe-a7ea-a00ccd07afff",
          "title": "Henri Potier à l'école des sorciers",
          "price": 35,
          "cover": "http://henri-potier.xebia.fr/hp0.jpg"
        }]);

    const expectedActions = [
      {type: actions.REQUEST_CATALOG},
      {
        type: actions.RECEIVE_CATALOG, data: [
        {
          "isbn": "c8fabf68-8374-48fe-a7ea-a00ccd07afff",
          "title": "Henri Potier à l'école des sorciers",
          "price": 35,
          "cover": "http://henri-potier.xebia.fr/hp0.jpg"
        }]
      }
    ];
    const store = mockStore({catalog: {books: [], isFetch: false, isFetching: false}},
      expectedActions, done);
    store.dispatch(actions.fetchCatalogIfNeeded());
  });

  it('Creates RECEIVE_OFFERS when fetching offers has been done', (done) => {
    nock('http://henri-potier.xebia.fr/')
      .get('/books/c8fabf68-8374-48fe-a7ea-a00ccd07afff/commercialOffers')
      .reply(200,
      {
        "offers": [
          {
            "type": "percentage",
            "value": 4
          }
        ]
      });

    const expectedActions = [
      {type: actions.REQUEST_OFFERS},
      {
        type: actions.RECEIVE_OFFERS,
        data: [
          {
            "type": "percentage",
            "value": 4
          }
        ]
      }
    ];
    const store = mockStore({
      cart: {
        purchase: {
          "c8fabf68-8374-48fe-a7ea-a00ccd07afff": {
            "book": {
              "isbn": "c8fabf68-8374-48fe-a7ea-a00ccd07afff",
              "title": "Henri Potier à l'école des sorciers",
              "price": 35,
              "cover": "http://henri-potier.xebia.fr/hp0.jpg"
            },
            "number": 1
          }
        }, offers: [], isFetch: false, isFetching: false
      }
    }, expectedActions, done);
    store.dispatch(actions.fetchOffersIfNeeded());
  });
});

describe('Test : Cart reducer', () => {
  // Mock localStorage
  beforeEach(() => {
    window.localStorage = {
      setItem: function () {
      }
    };
  });

  it('Add book to cart', () => {
    expect(cartReducer({purchase: {}, offers: [], isFetch: true, isFetching: false},
      {
        type: actions.ADD_BOOK_TO_CART,
        book: {
          "isbn": "c8fabf68-8374-48fe-a7ea-a00ccd07afff",
          "title": "Henri Potier à l'école des sorciers",
          "price": 35,
          "cover": "http://henri-potier.xebia.fr/hp0.jpg"
        }
      }
    )).to.deep.equal({
        purchase: {
          "c8fabf68-8374-48fe-a7ea-a00ccd07afff": {
            book: {
              "isbn": "c8fabf68-8374-48fe-a7ea-a00ccd07afff",
              "title": "Henri Potier à l'école des sorciers",
              "price": 35,
              "cover": "http://henri-potier.xebia.fr/hp0.jpg"
            },
            number: 1
          }
        }, offers: [], isFetch: false, isFetching: false
      });
  });

  it('Add the same book to cart', () => {
    expect(cartReducer({
        purchase: {
          "c8fabf68-8374-48fe-a7ea-a00ccd07afff": {
            book: {
              "isbn": "c8fabf68-8374-48fe-a7ea-a00ccd07afff",
              "title": "Henri Potier à l'école des sorciers",
              "price": 35,
              "cover": "http://henri-potier.xebia.fr/hp0.jpg"
            },
            number: 1
          }
        }, offers: [], isFetch: true, isFetching: false
      },
      {
        type: actions.ADD_BOOK_TO_CART,
        book: {
          "isbn": "c8fabf68-8374-48fe-a7ea-a00ccd07afff",
          "title": "Henri Potier à l'école des sorciers",
          "price": 35,
          "cover": "http://henri-potier.xebia.fr/hp0.jpg"
        }
      }
    )).to.deep.equal({
        purchase: {
          "c8fabf68-8374-48fe-a7ea-a00ccd07afff": {
            book: {
              "isbn": "c8fabf68-8374-48fe-a7ea-a00ccd07afff",
              "title": "Henri Potier à l'école des sorciers",
              "price": 35,
              "cover": "http://henri-potier.xebia.fr/hp0.jpg"
            },
            number: 2
          }
        }, offers: [], isFetch: true, isFetching: false
      });
  });

  it('Remove a book to cart', () => {
    expect(cartReducer({
        purchase: {
          "c8fabf68-8374-48fe-a7ea-a00ccd07afff": {
            book: {
              "isbn": "c8fabf68-8374-48fe-a7ea-a00ccd07afff",
              "title": "Henri Potier à l'école des sorciers",
              "price": 35,
              "cover": "http://henri-potier.xebia.fr/hp0.jpg"
            },
            number: 1
          }
        }, offers: [], isFetch: true, isFetching: false
      },
      {
        type: actions.REMOVE_BOOK_TO_CART,
        book: {
          "isbn": "c8fabf68-8374-48fe-a7ea-a00ccd07afff",
          "title": "Henri Potier à l'école des sorciers",
          "price": 35,
          "cover": "http://henri-potier.xebia.fr/hp0.jpg"
        }
      }
    )).to.deep.equal({
        purchase: {}, offers: [], isFetch: false, isFetching: false
      });
  });

  it('Remove book not present in cart', () => {
    expect(cartReducer({
        purchase: {
          "f8fabf68-8374-48fe-a7ea-a00ccd07afff": {
            book: {
              "isbn": "c8fabf68-8374-48fe-a7ea-a00ccd07afff",
              "title": "Henri Potier à l'école des sorciers",
              "price": 35,
              "cover": "http://henri-potier.xebia.fr/hp0.jpg"
            },
            number: 1
          }
        }, offers: [], isFetch: true, isFetching: false
      },
      {
        type: actions.REMOVE_BOOK_TO_CART,
        book: {
          "isbn": "c8fabf68-8374-48fe-a7ea-a00ccd07afff",
          "title": "Henri Potier à l'école des sorciers",
          "price": 35,
          "cover": "http://henri-potier.xebia.fr/hp0.jpg"
        }
      }
    )).to.deep.equal({
        purchase: {
          "f8fabf68-8374-48fe-a7ea-a00ccd07afff": {
            book: {
              "isbn": "c8fabf68-8374-48fe-a7ea-a00ccd07afff",
              "title": "Henri Potier à l'école des sorciers",
              "price": 35,
              "cover": "http://henri-potier.xebia.fr/hp0.jpg"
            },
            number: 1
          }
        }, offers: [], isFetch: true, isFetching: false
      });
  });


  it('Set the number of a specific book in cart', () => {
    expect(cartReducer({
        purchase: {
          "c8fabf68-8374-48fe-a7ea-a00ccd07afff": {
            book: {
              "isbn": "c8fabf68-8374-48fe-a7ea-a00ccd07afff",
              "title": "Henri Potier à l'école des sorciers",
              "price": 35,
              "cover": "http://henri-potier.xebia.fr/hp0.jpg"
            },
            number: 2
          }
        }, offers: [], isFetch: false, isFetching: false
      },
      {
        type: actions.SET_BOOK_NUMBER,
        book: {
          "isbn": "c8fabf68-8374-48fe-a7ea-a00ccd07afff",
          "title": "Henri Potier à l'école des sorciers",
          "price": 35,
          "cover": "http://henri-potier.xebia.fr/hp0.jpg"
        },
        number: 4
      }
    )).to.deep.equal({
        purchase: {
          "c8fabf68-8374-48fe-a7ea-a00ccd07afff": {
            book: {
              "isbn": "c8fabf68-8374-48fe-a7ea-a00ccd07afff",
              "title": "Henri Potier à l'école des sorciers",
              "price": 35,
              "cover": "http://henri-potier.xebia.fr/hp0.jpg"
            },
            number: 4
          }
        }, offers: [], isFetch: false, isFetching: false
      });
  });

  it('Set a string as number of a specific book in cart', () => {
    expect(cartReducer({
        purchase: {
          "c8fabf68-8374-48fe-a7ea-a00ccd07afff": {
            book: {
              "isbn": "c8fabf68-8374-48fe-a7ea-a00ccd07afff",
              "title": "Henri Potier à l'école des sorciers",
              "price": 35,
              "cover": "http://henri-potier.xebia.fr/hp0.jpg"
            },
            number: 2
          }
        }, offers: [], isFetch: false, isFetching: false
      },
      {
        type: actions.SET_BOOK_NUMBER,
        book: {
          "isbn": "c8fabf68-8374-48fe-a7ea-a00ccd07afff",
          "title": "Henri Potier à l'école des sorciers",
          "price": 35,
          "cover": "http://henri-potier.xebia.fr/hp0.jpg"
        },
        number: "toto"
      }
    )).to.deep.equal({
        purchase: {
          "c8fabf68-8374-48fe-a7ea-a00ccd07afff": {
            book: {
              "isbn": "c8fabf68-8374-48fe-a7ea-a00ccd07afff",
              "title": "Henri Potier à l'école des sorciers",
              "price": 35,
              "cover": "http://henri-potier.xebia.fr/hp0.jpg"
            },
            number: 1
          }
        }, offers: [], isFetch: false, isFetching: false
      });
  });
});

