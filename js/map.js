'use strict';

var MAP_PIN_WIDTH = 50;
var MAP_PIN_HEIGHT = 70;
var ADVERT_QUANTITY = 8;

var avatars = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
];

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

var getRandomValueFromArray = function (array) {
  var randomIndex = Math.floor(Math.random() * (array.length));
  return array.splice(randomIndex, 1);
};

function getRandomInInterval(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function compareWithRandomResult() {
  return Math.random() - 0.5;
}

function generateAdverts(advertsNumber) {
  var adverts = [];
  for (var i = 0; i < advertsNumber; i++) {

    var locationX = getRandomInInterval(300, 900);
    var locationY = getRandomInInterval(150, 500);

    var generatedAdvert = {
      author: {
        avatar: 'img/avatars/user' + getRandomValueFromArray(avatars) + '.png',
      },
      offer: {
        title: getRandomValueFromArray(titles),
        address: locationX + ', ' + locationY,
        price: getRandomInInterval(1000, 1000000),
        type: types[getRandomInInterval(0, types.length - 1)],
        rooms: getRandomInInterval(1, 5),
        guests: getRandomInInterval(1, 10),
        checkin: getRandomInInterval(12, 14) + ':00',
        checkout: getRandomInInterval(12, 14) + ':00',
        features: features.slice(getRandomInInterval(1, features.length - 1)),
        description: '',
        photos: photos.sort(compareWithRandomResult),
      },

      location: {
        x: locationX,
        y: locationY,
      },
    };
    adverts.push(generatedAdvert);
  }

  return adverts;
}

var renderMapPins = function (array) {
  var mapPinsContainerELement = document.querySelector('.map__pins');
  var mapPinsFragment = document.createDocumentFragment();
  var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');

  for (var i = 0; i < array.length; i++) {
    var pin = mapPinTemplate.cloneNode(true);
    var pinImg = pin.querySelector('img');

    pin.style.left = array[i].location.x - MAP_PIN_WIDTH / 2 + 'px';
    pin.style.top = array[i].location.y - MAP_PIN_HEIGHT + 'px';
    pinImg.src = array[i].author.avatar;
    mapPinsFragment.appendChild(pin);
  }

  mapPinsContainerELement.appendChild(mapPinsFragment);
};

var renderOfferCard = function (apartmentItem) {
  var mapFiltersContainerElement = document.querySelector('.map__filters-container');
  var offerCardTemplate = document.querySelector('template').content.querySelector('.map__card');
  var offerCard = offerCardTemplate.cloneNode(true);
  var paragraphElements = offerCard.querySelectorAll('p');
  var featuresElements = offerCard.querySelectorAll('.feature');
  // переменные для добавления фото
  var picturesFragment = document.createDocumentFragment();
  var picturesContainerElement = offerCard.querySelector('.popup__pictures');
  var pictureItemElement = picturesContainerElement.querySelector('li');
  var pictures = apartmentItem.offer.photos;

  var offerType = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
  };

  offerCard.querySelector('.popup__avatar').src = apartmentItem.author.avatar;
  offerCard.querySelector('h3').textContent = apartmentItem.offer.title;
  offerCard.querySelector('.popup__price').textContent = apartmentItem.offer.price + '₽/ночь';
  offerCard.querySelector('h4').textContent = offerType[apartmentItem.offer.type];

  paragraphElements[0].textContent = apartmentItem.offer.address;
  paragraphElements[2].textContent = apartmentItem.offer.rooms + ' комнаты для ' + apartmentItem.offer.guests + ' гостей';
  paragraphElements[3].textContent = 'Заезд после ' + apartmentItem.offer.checkin + ', выезд до ' + apartmentItem.offer.checkout;
  paragraphElements[4].textContent = apartmentItem.offer.description;

  for (var i = 0; i < featuresElements.length; i++) {
    if (apartmentItem.offer.features.indexOf(featuresElements[i].className.split('--')[1]) === -1) {
      featuresElements[i].remove();
    }
  }

  for (var j = 0; j < pictures.length; j++) {
    var apartmentPictureElement = pictureItemElement.cloneNode(true);
    apartmentPictureElement.querySelector('img').src = pictures[j];
    apartmentPictureElement.querySelector('img').width = 50;
    picturesFragment.appendChild(apartmentPictureElement);
  }
  picturesContainerElement.appendChild(picturesFragment);

  mapFiltersContainerElement.parentNode.insertBefore(offerCard, mapFiltersContainerElement);
};

var adverts = generateAdverts(ADVERT_QUANTITY);
var mapElement = document.querySelector('.map');

renderMapPins(adverts);
renderOfferCard(adverts[0]);
mapElement.classList.remove('map--faded');
