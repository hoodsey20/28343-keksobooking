'use strict';

var MAP_PIN_HEIGHT = 70;
var ADVERT_QUANTITY = 8;

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
        avatar: 'img/avatars/user0' + (i + 1) + '.png',
      },
      offer: {
        title: titles[i],
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

    pin.style.left = array[i].location.x + 'px';
    pin.style.top = array[i].location.y - MAP_PIN_HEIGHT / 2 + 'px';
    pinImg.src = array[i].author.avatar;
    mapPinsFragment.appendChild(pin);
  }

  mapPinsContainerELement.appendChild(mapPinsFragment);
};

var renderApartmentPictures = function (picturesContainer, pictures) {
  var picturesFragment = document.createDocumentFragment();
  var pictureItemElement = picturesContainer.querySelector('li');

  for (var i = 0; i < pictures.length; i++) {
    var apartmentPictureElement = pictureItemElement.cloneNode(true);
    apartmentPictureElement.querySelector('img').src = pictures[i];
    apartmentPictureElement.querySelector('img').width = 50;
    picturesFragment.appendChild(apartmentPictureElement);
  }
  picturesContainer.appendChild(picturesFragment);
};

var deleteOddFeatures = function (featureItems, featuresList) {
  for (var i = 0; i < featureItems.length; i++) {
    if (featuresList.indexOf(featureItems[i].className.split('--')[1]) === -1) {
      featureItems[i].remove();
    }
  }
};

var renderOfferCard = function (apartmentItem) {
  var mapFiltersContainerElement = document.querySelector('.map__filters-container');
  var offerCardTemplate = document.querySelector('template').content.querySelector('.map__card');
  var offerCard = offerCardTemplate.cloneNode(true);
  var paragraphElements = offerCard.querySelectorAll('p');
  var featureElements = offerCard.querySelectorAll('.feature');
  var picturesContainerElement = offerCard.querySelector('.popup__pictures');

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

  deleteOddFeatures(featureElements, apartmentItem.offer.features);
  renderApartmentPictures(picturesContainerElement, apartmentItem.offer.photos);

  mapFiltersContainerElement.parentNode.insertBefore(offerCard, mapFiltersContainerElement);
};

var adverts = generateAdverts(ADVERT_QUANTITY);
var mapElement = document.querySelector('.map');

renderMapPins(adverts);
renderOfferCard(adverts[0]);
mapElement.classList.remove('map--faded');
