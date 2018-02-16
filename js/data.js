'use strict';

window.data = (function () {
  return {
    titles: [
      'Большая уютная квартира',
      'Маленькая неуютная квартира',
      'Огромный прекрасный дворец',
      'Маленький ужасный дворец',
      'Красивый гостевой домик',
      'Некрасивый негостеприимный домик',
      'Уютное бунгало далеко от моря',
      'Неуютное бунгало по колено в воде',
    ],
    types: [
      'flat',
      'house',
      'bungalo',
    ],
    features: [
      'wifi',
      'dishwasher',
      'parking',
      'washer',
      'elevator',
      'conditioner',
    ],
    photos: [
      'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
      'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
      'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
    ],
    generateOffers: function (numberOfOffers) {
      var offers = [];
      for (var i = 0; i < numberOfOffers; i++) {
        var locationX = window.util.getRandomInInterval(300, 900);
        var locationY = window.util.getRandomInInterval(150, 500);

        var generatedOffer = {
          author: {
            avatar: 'img/avatars/user0' + (i + 1) + '.png',
          },
          offer: {
            title: this.titles[i],
            address: locationX + ', ' + locationY,
            price: window.util.getRandomInInterval(1000, 1000000),
            type: this.types[window.util.getRandomInInterval(0, this.types.length - 1)],
            rooms: window.util.getRandomInInterval(1, 5),
            guests: window.util.getRandomInInterval(1, 10),
            checkin: window.util.getRandomInInterval(12, 14) + ':00',
            checkout: window.util.getRandomInInterval(12, 14) + ':00',
            features: this.features.slice(window.util.getRandomInInterval(1, this.features.length - 1)),
            description: '',
            photos: this.photos.sort(window.util.compareWithRandomResult),
          },
          location: {
            x: locationX,
            y: locationY,
          },
        };
        offers.push(generatedOffer);
      }

      return offers;
    },
  };
})();
