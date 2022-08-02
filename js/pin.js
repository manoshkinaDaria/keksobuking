'use strict'
var createPin = (function () {

    let renderPin = function (pin) {
        let pinTemplate = document.querySelector('#pin').content.cloneNode(true);
        let mapPinElement = pinTemplate.querySelector('.map__pin');
        mapPinElement.setAttribute('data-pin-info', JSON.stringify(pin));
        mapPinElement.style.left = pin.location.x + 'px';
        mapPinElement.style.top = pin.location.y + 'px';
        mapPinElement.querySelector('img').src = pin.author.avatar;
        return mapPinElement;
    };

    return {
        renderPin: renderPin
    }

})();