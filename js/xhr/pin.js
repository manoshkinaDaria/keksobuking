'use strict'
var createPin = (function () {
    var renderPin = function (pin) {
        var pinTemplate = document.querySelector('#pin').content.cloneNode(true);
        var mapPinElement = pinTemplate.querySelector('.map__pin');
        mapPinElement.setAttribute('data-pin-info', JSON.stringify(pin));
        mapPinElement.setAttribute('data-pin-info', JSON.stringify(pin));
        mapPinElement.querySelector('img').src = pin.author.avatar;
        mapPinElement.querySelector('img').alt = pin.offer.title;
        mapPinElement.style.left = pin.location.x + 'px';
        mapPinElement.style.top = pin.location.y + 'px';
        return mapPinElement;

    }

    return {
        renderPin: renderPin,

    }

})();