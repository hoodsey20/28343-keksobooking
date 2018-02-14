'use strict';

var MAIN_PIN_WIDTH = 65;
var MAIN_PIN_HEIGHT = 65;
var MAIN_PIN_PEAK_HEIGHT = 22;
var MAP_PIN_HEIGHT = 70;
var OFFER_QUANTITY = 8;

var templateElement = document.querySelector('template');

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

var createOfferPin = function (offer) {
  var mapPinTemplate = templateElement.content.querySelector('.map__pin');
  var pin = mapPinTemplate.cloneNode(true);
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

  for (var i = 0; i < offers.length; i++) {
    mapPinsFragment.appendChild(createOfferPin(offers[i]));
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
  var offerCardTemplate = templateElement.content.querySelector('.map__card');
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
  removeMapPins();
};

var removeMapPins = function () {
  var pinsElements = document.querySelectorAll('.map__pin');

  if (pinsElements.length < 2) {
    return;
  }

  pinsElements = Array.prototype.slice.call(pinsElements, 1);

  for (var i = 0; i < pinsElements.length; i++) {
    pinsElements[i].remove();
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

var submitBtnElement = offerFormElement.querySelector('.form__submit');
var resetBtnElement = offerFormElement.querySelector('.form__reset');
var inputElements = offerFormElement.querySelectorAll('input');
var roomsInputElement = offerFormElement.querySelector('#room_number');
var capacityInputElement = offerFormElement.querySelector('#capacity');
var typeInputElement = offerFormElement.querySelector('#type');
var arrivalInputElement = offerFormElement.querySelector('#timein');
var departureInputElement = offerFormElement.querySelector('#timeout');

var highlightInvalidInput = function (input) {
  input.classList.add('invalid-value-input');
};

var resetInvalidHighlightingInput = function (input) {
  input.classList.remove('invalid-value-input');
};

var checkGuestsCapacity = function () {
  var rooms = Number(roomsInputElement.value);
  var guests = Number(capacityInputElement.value);
  var setInvalidCapacity = function (customValidityText) {
    capacityInputElement.setCustomValidity(customValidityText);
    highlightInvalidInput(capacityInputElement);
  };

  capacityInputElement.setCustomValidity('');
  resetInvalidHighlightingInput(capacityInputElement);

  if (rooms !== 100 && guests !== 0) {
    if (rooms < guests) {
      setInvalidCapacity('Количество гостей не может превышать количество комнат');
    }
  } else if (rooms === 100 && guests !== 0) {
    setInvalidCapacity('Количество комнат не для гостей');
  } else if (rooms !== 100 && guests === 0) {
    setInvalidCapacity('Необходимо указать большее количество гостей');
  }
};

var checkPricePerNight = function () {
  var lodgingType = typeInputElement.value;
  var priceInputElement = offerFormElement.querySelector('#price');

  switch (lodgingType) {
    case 'flat':
      priceInputElement.min = 1000;
      break;
    case 'bungalo':
      priceInputElement.min = 0;
      break;
    case 'house':
      priceInputElement.min = 5000;
      break;
    case 'palace':
      priceInputElement.min = 10000;
      break;
  }
};

var synchronizeArrivalandDeparture = function (evt) {
  if (evt.target === arrivalInputElement) {
    departureInputElement.value = evt.target.value;
  } else {
    arrivalInputElement.value = evt.target.value;
  }
};

submitBtnElement.addEventListener('click', function () {
  for (var i = 0; i < inputElements.length; i++) {
    resetInvalidHighlightingInput(inputElements[i]);
  }
  checkGuestsCapacity();
});

resetBtnElement.addEventListener('click', function () {
  offerFormElement.reset();
  unsetActiveState();
});

for (var i = 0; i < inputElements.length; i++) {
  inputElements[i].addEventListener('invalid', function (evt) {
    highlightInvalidInput(evt.target);
  });
}


departureInputElement.addEventListener('change', synchronizeArrivalandDeparture);
arrivalInputElement.addEventListener('change', synchronizeArrivalandDeparture);
typeInputElement.addEventListener('change', checkPricePerNight);
roomsInputElement.addEventListener('change', checkGuestsCapacity);
capacityInputElement.addEventListener('change', checkGuestsCapacity);
