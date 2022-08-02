'use strict'
var filter = (function () {
    var housingType = document.querySelector('#housing-type');

    var housingTypeSort = function () {
        var nodeType = housingType.value;
        var newpins = pins.slice()
            .filter(function (pin) {
                if (nodeType === 'any') {
                    return pin.offer.type;
                } else {
                    return pin.offer.type === nodeType;
                }
            });
        utils.toArray(mapPins.querySelectorAll('.map__pin:not(.map__pin--main)')).forEach(function (pin) {
            pin.remove();
        });
        map.drawPins(newpins.slice(0, 5));
    };
    housingType.addEventListener('change', housingTypeSort);

})();
