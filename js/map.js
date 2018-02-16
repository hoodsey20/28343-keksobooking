'use strict';

var templateElement = document.querySelector('template');

var generateOffers = function (numberOfOffers) {
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
  pin.style.top = offer.location.y - window.consts.MAP_PIN_HEIGHT / 2 + 'px';
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

  var currentRoomsWordForm = window.util.getRightWorldForm(offerItem.offer.rooms, 'комната', 'комнаты', 'комнат');
  var guestsRoomsWordForm = window.util.getRightWorldForm(offerItem.offer.guests, 'гостя', 'гостей', 'гостей');

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

var generatedOffers = generateOffers(window.consts.OFFER_QUANTITY);
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
  resetAllInvalidHighlighting();
  removeMapPins();
  removeOfferCard();
  mainPinElement.addEventListener('mouseup', addMapPinsHandler);
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
  adressInputElement.value = Math.round(xCoordinate) + ', ' + Math.round(yCoordinate);
};

var mainPinMouseupHandler = function (evt) {
  var mainPinOffsetLeft = evt.currentTarget.offsetLeft;
  var mainPinOffsetTop = evt.currentTarget.offsetTop;
  var mainPinXCoordinate = mainPinOffsetLeft + window.consts.MAIN_PIN_WIDTH / 2;
  var mainPinYCoordinate = mainPinOffsetTop + window.consts.MAIN_PIN_HEIGHT + window.consts.MAIN_PIN_PEAK_HEIGHT;

  setAddress(mainPinXCoordinate, mainPinYCoordinate);
};

var addMapPinsHandler = function () {
  renderMapPins(generatedOffers);
  mainPinElement.removeEventListener('mouseup', addMapPinsHandler);
};

var submitBtnElement = offerFormElement.querySelector('.form__submit');
var resetBtnElement = offerFormElement.querySelector('.form__reset');
var inputElements = offerFormElement.querySelectorAll('input');
var roomsInputElement = offerFormElement.querySelector('#room_number');
var typeInputElement = offerFormElement.querySelector('#type');
var arrivalInputElement = offerFormElement.querySelector('#timein');
var departureInputElement = offerFormElement.querySelector('#timeout');

var highlightInvalidInput = function (input) {
  input.classList.add('invalid-value-input');
};

var resetInvalidHighlightingInput = function (input) {
  input.classList.remove('invalid-value-input');
};

var resetAllInvalidHighlighting = function () {
  var invalidInputs = offerFormElement.querySelectorAll('.invalid-value-input');
  for (var i = 0; i < invalidInputs.length; i++) {
    resetInvalidHighlightingInput(invalidInputs[i]);
  }
};

var checkDisabledOptions = function () {
  var selectElements = offerFormElement.querySelectorAll('select');

  for (var i = 0; i < selectElements.length; i++) {
    var selectedOptionElement = window.util.findOptionByValue(selectElements[i], selectElements[i].value);
    resetInvalidHighlightingInput(selectElements[i]);
    selectElements[i].setCustomValidity('');

    if (selectedOptionElement.disabled) {
      highlightInvalidInput(selectElements[i]);
      selectElements[i].setCustomValidity('Данный вариант не может быть принят');
    }
  }
};

var roomsInputHandler = function (evt) {
  var capacityInputElement = offerFormElement.querySelector('#capacity');
  var capacityOptionElements = capacityInputElement.querySelectorAll('option');
  var roomsInputValue = evt.target.value;

  switch (roomsInputValue) {
    case '1':
      window.util.setDisabledByValuesetDisabledByValue(capacityOptionElements, ['0', '2', '3']);
      break;
    case '2':
      window.util.setDisabledByValuesetDisabledByValue(capacityOptionElements, ['0', '3']);
      break;
    case '3':
      window.util.setDisabledByValuesetDisabledByValue(capacityOptionElements, ['0']);
      break;
    case '100':
      window.util.setDisabledByValuesetDisabledByValue(capacityOptionElements, ['1', '2', '3']);
      break;
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

var changeArrivalandDepartureHandler = function (evt) {
  if (evt.target === arrivalInputElement) {
    departureInputElement.value = evt.target.value;
  } else {
    arrivalInputElement.value = evt.target.value;
  }
};

var submitFormHandler = function () {
  for (var i = 0; i < inputElements.length; i++) {
    resetInvalidHighlightingInput(inputElements[i]);
  }
  checkDisabledOptions();
};

var resetFormHandler = function () {
  offerFormElement.reset();
  unsetActiveState();
};

unsetActiveState();

mainPinElement.addEventListener('mouseup', setActiveStateHandler);
mainPinElement.addEventListener('mouseup', addMapPinsHandler);
mainPinElement.addEventListener('mouseup', mainPinMouseupHandler);

submitBtnElement.addEventListener('click', submitFormHandler);
resetBtnElement.addEventListener('click', resetFormHandler);
departureInputElement.addEventListener('change', changeArrivalandDepartureHandler);
arrivalInputElement.addEventListener('change', changeArrivalandDepartureHandler);
typeInputElement.addEventListener('change', checkPricePerNight);
roomsInputElement.addEventListener('change', roomsInputHandler);

for (var i = 0; i < inputElements.length; i++) {
  inputElements[i].addEventListener('invalid', function (evt) {
    highlightInvalidInput(evt.target);
  });
}
