import app from '../../app';
import {expect, assert} from 'chai';

describe('Test : Cart', () => {
  let cartServices;
  let httpBackend;
  beforeEach(angular.mock.module('app'));

  beforeEach(angular.mock.inject(function(_cartServices_, $httpBackend) {
    cartServices = _cartServices_;
    httpBackend = $httpBackend;
  }));

  it('Compute the best price', () => {
    cartServices.data.purchase = {"c8fabf68-8374-48fe-a7ea-a00ccd07afff" : {
      "book":{
        "isbn": "c8fabf68-8374-48fe-a7ea-a00ccd07afff",
        "title": "Henri Potier à l'école des sorciers",
        "price": 35,
        "cover": "http://henri-potier.xebia.fr/hp0.jpg"
      },
      "number" : 1
    }};
    cartServices.data.offers = [
      {
        "type": "percentage",
        "value": 4
      }
    ];

    cartServices.computeBestOffer();
    expect(33.6).to.equal(cartServices.bestOffer);
  });
});


// httpBackend.whenGET("http://henri-potier.xebia.fr/books/c8fabf68-8374-48fe-a7ea-a00ccd07afff/commercialOffers")
//   .respond(
//     {
//       data: {
//         "offers": [
//           {
//             "type": "percentage",
//             "value": 4
//           }
//         ]
//       }
//     });
