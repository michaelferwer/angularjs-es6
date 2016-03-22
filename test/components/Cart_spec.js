import React from 'react';
import {renderIntoDocument, scryRenderedDOMComponentsWithTag} from 'react-addons-test-utils';
import {expect} from 'chai';

import { Cart } from '../../src/components/Cart';

describe('Test : Cart', () => {
  it('Compute the best price', () => {
    var cart = new Cart({
      cart: {
        purchase: {
          "c8fabf68-8374-48fe-a7ea-a00ccd07afff": {
            book: {
              "isbn": "c8fabf68-8374-48fe-a7ea-a00ccd07afff",
              "title": "Henri Potier à l'école des sorciers",
              "price": 35,
              "cover": "http://henri-potier.xebia.fr/hp0.jpg"
            },
            number: 1
          },
          "a460afed-e5e7-4e39-a39d-c885c05db861": {
            book: {
              "isbn": "a460afed-e5e7-4e39-a39d-c885c05db861",
              "title": "Henri Potier et la Chambre des secrets",
              "price": 30,
              "cover": "http://henri-potier.xebia.fr/hp1.jpg"
            },
            number: 1
          }
        },
        offers: [
          {"type": "percentage", "value": 5},
          {"type": "minus", "value": 15},
          {"type": "slice", "sliceValue": 100, "value": 12}
        ],
        isFetch: true,
        isFetching: false
      }
    });
    expect(cart.computePrice()).to.deep.equal(50);
  });
});



