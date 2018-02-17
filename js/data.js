'use strict';

(function () {
  var OFFER_QUANTITY = 8;
  var titles = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде',
  ];
  var types = [
    'flat',
    'house',
    'bungalo',
  ];
  var features = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner',
  ];
  var photos = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
  ];

  var generateOffers = function (numberOfOffers) {
    var offers = [];
    for (var i = 0; i < numberOfOffers; i++) {
      var locationX = window.util.getRandomInInterval(300, 900);
      var locationY = window.util.getRandomInInterval(150, 500);

      var generatedOffer = {
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png',
        },
        offer: {
          title: titles[i],
          address: locationX + ', ' + locationY,
          price: window.util.getRandomInInterval(1000, 1000000),
          type: types[window.util.getRandomInInterval(0, types.length - 1)],
          rooms: window.util.getRandomInInterval(1, 5),
          guests: window.util.getRandomInInterval(1, 10),
          checkin: window.util.getRandomInInterval(12, 14) + ':00',
          checkout: window.util.getRandomInInterval(12, 14) + ':00',
          features: features.slice(window.util.getRandomInInterval(1, features.length - 1)),
          description: '',
          photos: photos.sort(window.util.compareWithRandomResult),
        },
        location: {
          x: locationX,
          y: locationY,
        },
      };
      offers.push(generatedOffer);
    }

    return offers;
  };

  window.data = generateOffers(OFFER_QUANTITY);
})();
