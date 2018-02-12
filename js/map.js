'use strict';

var MAIN_PIN_WIDTH = 65;
var MAIN_PIN_HEIGHT = 65;
var MAIN_PIN_PEAK_HEIGHT = 22;
var MAP_PIN_HEIGHT = 70;
var OFFER_QUANTITY = 8;

function getRandomInInterval(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function compareWithRandomResult() {
  return Math.random() - 0.5;
}

function generateOffers(numberOfOffers) {
  var offers = [];

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

  for (var i = 0; i < numberOfOffers; i++) {
    var locationX = getRandomInInterval(300, 900);
    var locationY = getRandomInInterval(150, 500);

    var generatedOffer = {
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
    offers.push(generatedOffer);
  }

  return offers;
}

var removeOfferCard = function () {
  var offerCardElement = document.querySelector('.map__card');
  if (offerCardElement) {
    offerCardElement.remove();
  }
};

var createOfferPin = function (offer, pinTemplate) {
  var pin = pinTemplate.cloneNode(true);
  var pinImg = pin.querySelector('img');

  pin.style.left = offer.location.x + 'px';
  pin.style.top = offer.location.y - MAP_PIN_HEIGHT / 2 + 'px';
  pinImg.src = offer.author.avatar;

  pin.addEventListener('click', function () {
    removeOfferCard();
    renderOfferCard(offer);
  });

  return pin;
};

var renderMapPins = function (offers) {
  var mapPinsContainerELement = document.querySelector('.map__pins');
  var mapPinsFragment = document.createDocumentFragment();
  var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');

  for (var i = 0; i < offers.length; i++) {
    mapPinsFragment.appendChild(createOfferPin(offers[i], mapPinTemplate));
  }

  mapPinsContainerELement.appendChild(mapPinsFragment);
};

var renderOfferPictures = function (picturesContainer, pictures) {
  var picturesFragment = document.createDocumentFragment();
  var pictureItemElement = picturesContainer.querySelector('li');

  for (var i = 0; i < pictures.length; i++) {
    var offerPictureElement = pictureItemElement.cloneNode(true);
    offerPictureElement.querySelector('img').src = pictures[i];
    offerPictureElement.querySelector('img').width = 50;
    picturesFragment.appendChild(offerPictureElement);
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

var getRightWorldForm = function (num, one, two, five) {
  var number = Math.abs(num);
  var remainderOfDivisionBy100 = number % 100;
  var remainderOfDivisionBy10 = number % 10;
  var noun = one;

  if (remainderOfDivisionBy100 > 4 && remainderOfDivisionBy100 < 20 || remainderOfDivisionBy10 === 0 || remainderOfDivisionBy10 >= 5) {
    noun = five;
  } else if (remainderOfDivisionBy10 > 1 && remainderOfDivisionBy10 < 5) {
    noun = two;
  }

  return noun;
};

var renderOfferCard = function (offerItem) {
  var mapFiltersContainerElement = document.querySelector('.map__filters-container');
  var offerCardTemplate = document.querySelector('template').content.querySelector('.map__card');
  var offerCard = offerCardTemplate.cloneNode(true);
  var paragraphElements = offerCard.querySelectorAll('p');
  var featureElements = offerCard.querySelectorAll('.feature');
  var picturesContainerElement = offerCard.querySelector('.popup__pictures');
  var closeElement = offerCard.querySelector('.popup__close');

  var offerType = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
  };

  var currentRoomsWordForm = getRightWorldForm(offerItem.offer.rooms, 'комната', 'комнаты', 'комнат');
  var guestsRoomsWordForm = getRightWorldForm(offerItem.offer.guests, 'гостя', 'гостей', 'гостей');

  offerCard.querySelector('.popup__avatar').src = offerItem.author.avatar;
  offerCard.querySelector('h3').textContent = offerItem.offer.title;
  offerCard.querySelector('.popup__price').textContent = offerItem.offer.price + '₽/ночь';
  offerCard.querySelector('h4').textContent = offerType[offerItem.offer.type];

  paragraphElements[0].textContent = offerItem.offer.address;
  paragraphElements[2].textContent = offerItem.offer.rooms + ' ' + currentRoomsWordForm + ' для ' + offerItem.offer.guests + ' ' + guestsRoomsWordForm;
  paragraphElements[3].textContent = 'Заезд после ' + offerItem.offer.checkin + ', выезд до ' + offerItem.offer.checkout;
  paragraphElements[4].textContent = offerItem.offer.description;

  deleteOddFeatures(featureElements, offerItem.offer.features);
  renderOfferPictures(picturesContainerElement, offerItem.offer.photos);
  closeElement.addEventListener('click', removeOfferCard);
  mapFiltersContainerElement.parentNode.insertBefore(offerCard, mapFiltersContainerElement);
};

var generatedOffers = generateOffers(OFFER_QUANTITY);
var mapElement = document.querySelector('.map');
var offerFormElement = document.querySelector('.notice__form');
var offerFormFieldsetElements = offerFormElement.querySelectorAll('fieldset');
var mainPinElement = document.querySelector('.map__pin--main');

var setActiveStateHandler = function () {
  offerFormElement.classList.remove('notice__form--disabled');
  mapElement.classList.remove('map--faded');
  for (var i = 0; i < offerFormFieldsetElements.length; i++) {
    offerFormFieldsetElements[i].disabled = false;
  }
};

var unsetActiveState = function () {
  offerFormElement.classList.add('notice__form--disabled');
  mapElement.classList.add('map--faded');
  for (var i = 0; i < offerFormFieldsetElements.length; i++) {
    offerFormFieldsetElements[i].disabled = true;
  }
};

var setAddress = function (xCoordinate, yCoordinate) {
  var adressInputElement = document.querySelector('#address');
  adressInputElement.value = xCoordinate + ', ' + yCoordinate;
};

var mainPinMouseupHandler = function (evt) {
  var mainPinOffsetLeft = evt.currentTarget.offsetLeft;
  var mainPinOffsetTop = evt.currentTarget.offsetTop;
  var mainPinXCoordinate = mainPinOffsetLeft + MAIN_PIN_WIDTH / 2;
  var mainPinYCoordinate = mainPinOffsetTop + MAIN_PIN_HEIGHT + MAIN_PIN_PEAK_HEIGHT;

  setAddress(mainPinXCoordinate, mainPinYCoordinate);
};

var addMapPinsHandler = function () {
  renderMapPins(generatedOffers);
  mainPinElement.removeEventListener('mouseup', addMapPinsHandler);
};

unsetActiveState();

mainPinElement.addEventListener('mouseup', setActiveStateHandler);
mainPinElement.addEventListener('mouseup', addMapPinsHandler);
mainPinElement.addEventListener('mouseup', mainPinMouseupHandler);
