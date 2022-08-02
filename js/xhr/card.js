'use strict'
var card = (function () {
    var mapPins = document.querySelector('.map__pins');
    var map = document.querySelector('.map');

    var HOUSING = {
        FLAT: 'flat',
        PALACE: 'palace',
        HOUSE: 'house',
        BUNGALO: 'bungalo'
    };
    var HOUSING_TRANSLATE = {};
    HOUSING_TRANSLATE[HOUSING.FLAT] = 'Квартира';
    HOUSING_TRANSLATE[HOUSING.PALACE] = 'Дворец';
    HOUSING_TRANSLATE[HOUSING.HOUSE] = 'Дом';
    HOUSING_TRANSLATE[HOUSING.BUNGALO] = 'Бунгало';


    var NECESSARY_FEATURE = {
        WIFI: 'wifi',
        DISHWASHER: 'dishwasher',
        PARKING: 'parking',
        WASHER: 'washer',
        CONDITIONER: 'conditioner',
        ELEVATOR: 'elevator'
    };

    var NECESSARY_FEATURE_TRANSLATE = {};
    NECESSARY_FEATURE_TRANSLATE[NECESSARY_FEATURE.WIFI] = 'popup__feature--wifi';
    NECESSARY_FEATURE_TRANSLATE[NECESSARY_FEATURE.DISHWASHER] = 'popup__feature--dishwasher';
    NECESSARY_FEATURE_TRANSLATE[NECESSARY_FEATURE.PARKING] = 'popup__feature--parking';
    NECESSARY_FEATURE_TRANSLATE[NECESSARY_FEATURE.WASHER] = 'popup__feature--washer';
    NECESSARY_FEATURE_TRANSLATE[NECESSARY_FEATURE.CONDITIONER] = 'popup__feature--conditioner';
    NECESSARY_FEATURE_TRANSLATE[NECESSARY_FEATURE.ELEVATOR] = 'popup__feature--elevator';

    var open = function (pinNode) {
        var pinData = JSON.parse(pinNode.getAttribute('data-pin-info'));
        var cardTemplate = document.querySelector('#card').content.cloneNode(true);
        var mapCard = cardTemplate.querySelector('.map__card');
        var closeButton = mapCard.querySelector('.popup__close');
        var close = function () {
            mapCard.classList.add('hidden');
        }
        closeButton.addEventListener('click', close);
        mapCard.querySelector('.popup__avatar').src = pinData.author.avatar;
        mapCard.querySelector('h3').textContent = pinData.offer.title;
        mapCard.querySelector('.popup__text--address').textContent = pinData.offer.adress;
        mapCard.querySelector('.popup__text--price').textContent = pinData.offer.price;
        mapCard.querySelector('.popup__type').textContent = HOUSING_TRANSLATE[pinData.offer.type];
        mapCard.querySelector('.popup__text--capacity').textContent = pinData.offer.rooms + ' комнаты' + ' для ' + pinData.offer.guests + ' гостей';
        mapCard.querySelector('.popup__text--time').textContent = 'Заезд после' + pinData.offer.checkin + ',' + ' выезд до' + pinData.offer.checkout;
        mapCard.querySelector('.popup__description').textContent = pinData.offer.description;
        var popupFeatures = mapCard.querySelector('.popup__features');
        pinData.offer.features.forEach(function (feature) {
            var featureTemplate = document.querySelector('#featureTemplate').content.cloneNode(true);
            var popupFeature = featureTemplate.querySelector('.popup__feature');
            popupFeature.classList.add(NECESSARY_FEATURE_TRANSLATE[feature]);
            popupFeatures.appendChild(popupFeature);
        });

        var popupPhotos = mapCard.querySelector('.popup__photos');
        pinData.offer.photos.forEach(function (photo) {
            var photoTemplate = document.querySelector('#photoTemplate').content.cloneNode(true);
            var popupPhoto = photoTemplate.querySelector('.popup__photo');
            popupPhoto.src = photo;
            popupPhotos.appendChild(popupPhoto)
        });
        var mapCardRemovable = map.querySelector('.map__card');
        if (mapCardRemovable) {
            mapCardRemovable.remove();
        }
        mapPins.appendChild(mapCard);



    };
    return {
        open: open,
    }
})();