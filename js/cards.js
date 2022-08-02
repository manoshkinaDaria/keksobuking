'use strict'
let cards = (function () {
    let NECESSARY_FEATURE = {
        WIFI: 'wifi',
        DISHWASHER: 'dishwasher',
        PARKING: 'parking',
        WASHER: 'washer',
        ELEVATOR: 'elevator',
        CONDITIONER: 'conditioner'
    };

    let NECESSARY_FEATURE_CLASSES = {};
    NECESSARY_FEATURE_CLASSES[NECESSARY_FEATURE.WIFI] = 'popup__feature--wifi';
    NECESSARY_FEATURE_CLASSES[NECESSARY_FEATURE.DISHWASHER] = 'popup__feature--dishwasher';
    NECESSARY_FEATURE_CLASSES[NECESSARY_FEATURE.PARKING] = 'popup__feature--parking';
    NECESSARY_FEATURE_CLASSES[NECESSARY_FEATURE.WASHER] = 'popup__feature--washer';
    NECESSARY_FEATURE_CLASSES[NECESSARY_FEATURE.CONDITIONER] = 'popup__feature--conditioner';
    NECESSARY_FEATURE_CLASSES[NECESSARY_FEATURE.ELEVATOR] = 'popup__feature--elevator';

    let HOSING = {
        PALACE: 'palace',
        FLAT: 'flat',
        HOUSE: 'house',
        BUNGALO: 'bungalo'
    }

    let HOUSING_TRANSLATE = {}
    HOUSING_TRANSLATE[HOSING.PALACE] = 'Дворец';
    HOUSING_TRANSLATE[HOSING.FLAT] = 'Квартира';
    HOUSING_TRANSLATE[HOSING.HOUSE] = 'Дом';
    HOUSING_TRANSLATE[HOSING.BUNGALO] = 'Бунгало';

    let mapPins = document.querySelector('.map__pins');
    let map = document.querySelector('.map');
    var createCard = function (evt) {
        var closestParentWithPinClassName = evt.target.closest('.map__pin');
        if (closestParentWithPinClassName && !closestParentWithPinClassName.classList.contains('map__pin--main')) {
            let cardOfpin = JSON.parse(closestParentWithPinClassName.getAttribute('data-pin-info'));
            let cardTemplate = document.querySelector('#card').content.cloneNode(true);
            let mapCard = cardTemplate.querySelector('.map__card');
            let closeButton = mapCard.querySelector('.popup__close');
            mapCard.querySelector('h3').textContent = cardOfpin.offer.title;
            mapCard.querySelector('.popup__text--address').textContent = cardOfpin.offer.adress;
            mapCard.querySelector('.popup__text--price').textContent = cardOfpin.offer.price + ' рублей';
            mapCard.querySelector('.popup__type').textContent = HOUSING_TRANSLATE[cardOfpin.offer.type];
            mapCard.querySelector('.popup__text--capacity').textContent = cardOfpin.offer.rooms + ' комнаты' + ' для ' + cardOfpin.offer.guests + ' гостей';
            mapCard.querySelector('.popup__text--time').textContent = 'Заезд после' + cardOfpin.offer.checkin + ',' + ' выезд до' + cardOfpin.offer.checkout;
            mapCard.querySelector('.popup__description').textContent = cardOfpin.offer.description;
            let popupFeatures = mapCard.querySelector('.popup__features');
            cardOfpin.offer.features.forEach(function (feature) {
                let featureTemplate = document.querySelector('#featureTemplate').content.cloneNode(true);
                let popupFeature = featureTemplate.querySelector('.popup__feature');
                popupFeature.classList.add(NECESSARY_FEATURE_CLASSES[feature]);
                popupFeatures.appendChild(popupFeature);
            });

            let popupPhotos = mapCard.querySelector('.popup__photos');
            cardOfpin.offer.photos.forEach(function (photo) {
                let photoTemplate = document.querySelector('#photoTemplate').content.cloneNode(true);
                let popupPhoto = photoTemplate.querySelector('.popup__photo');
                popupPhoto.src = photo;
                popupPhotos.appendChild(popupPhoto)
            });
            let mapCardRemovable = map.querySelector('.map__card');
            if (mapCardRemovable) {
                mapCardRemovable.remove();
            }
            mapPins.appendChild(mapCard);
            let onEscapePress = function (evt) {
                utils.escape(evt, close)
            }

            let close = function () {
                mapCard.classList.add('hidden');
                document.removeEventListener('keydown', onEscapePress);
            };

            closeButton.addEventListener('click', close);
            document.addEventListener('keydown', onEscapePress);


        }
    };
    mapPins.addEventListener('click', createCard);


    return {

    }


})();