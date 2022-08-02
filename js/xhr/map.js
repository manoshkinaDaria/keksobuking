'use strict'
var map = (function () {
    var map = document.querySelector('.map');
    var mapPins = document.querySelector('.map__pins');
    var mapPinMain = document.querySelector('.map__pin--main')
    var adForm = document.querySelector('.ad-form');
    var addressField = document.querySelector('#address');
    var housingType = document.querySelector('#housing-type');
    var priceSelect = document.querySelector('#housing-price');
    var mapFilters = document.querySelector('.map__filters')
    var widthPin = 62;
    var heightPin = 84;
    var MAX_TOP = 130;
    var MAX_BOTTOM = 630;
    var MAX_RIGHT = 1135;
    var MAX_LEFT = 0;
    var pins = null;


    var PriceRange = {
        low: {
            MIN: 0,
            MAX: 10000
        },
        middle: {
            MIN: 10000,
            MAX: 50000
        },
        high: {
            MIN: 50000,
            MAX: Infinity
        }
    };

    function addPins(data) {
        pins = data;

        mapPins.addEventListener('click', function (e) {
            var pin = e.target.closest('.map__pin');
            if (pin && !pin.classList.contains('map__pin--main')) {

                card.open(pin)

            }
        });
    }

    Object.values(adForm).forEach(function (fieldset) {
        fieldset.disabled = true;
    });

    var handleEnterPress = function (e) {
        utils.enter(e, activateMap);
    }

    var activateMap = function () {
        map.classList.remove('map--faded');
        adForm.classList.remove('ad-form--disabled');
        Object.values(adForm).forEach(function (fieldset) {
            fieldset.disabled = false;
        });
        drawPins(pins.slice(0, 5));



    }



    var drawPins = function (pins) {

        var fragment = document.createDocumentFragment();
        utils.toArray(pins).forEach(function (pin) {
            fragment.appendChild(createPin.renderPin(pin));
        });
        mapPins.appendChild(fragment);
        mapPinMain.removeEventListener('mousedown', activateMap);
        mapPinMain.removeEventListener('keydown', handleEnterPress);
    };

    var setMainPinStartPosition = function () {
        var mainXStart = Math.round(parseInt(mapPinMain.style.left, 10) + 32.5);
        var mainYStart = Math.round(parseInt(mapPinMain.style.top, 10) + 32.5);
        addressField.value = mainXStart + ', ' + mainYStart;

    };

    var getMainPinPosition = function () {
        var mainX = parseInt(mapPinMain.style.left, 10) + widthPin / 2;
        var mainY = parseInt(mapPinMain.style.top, 10) + heightPin;
        addressField.value = mainX + ', ' + mainY;
    };

    mapPinMain.addEventListener('mousedown', function (event) {
        event.preventDefault();
        var startCoords = {
            x: event.clientX,
            y: event.clientY
        };
        function onMouseMove(moveEvt) {
            var shift = {
                x: startCoords.x - moveEvt.clientX,
                y: startCoords.y - moveEvt.clientY
            };

            startCoords = {
                x: moveEvt.clientX,
                y: moveEvt.clientY
            };

            mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
            mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';

            if (mapPinMain.offsetLeft >= MAX_RIGHT) {
                mapPinMain.style.left = MAX_RIGHT + 'px';
            } else if (mapPinMain.offsetLeft <= MAX_LEFT) {
                mapPinMain.style.left = MAX_LEFT + 'px';
            }
            if (mapPinMain.offsetTop <= MAX_TOP) {
                mapPinMain.style.top = MAX_TOP + 'px';
            }
            if (mapPinMain.offsetTop >= MAX_BOTTOM) {
                mapPinMain.style.top = MAX_BOTTOM + 'px';
            }
            getMainPinPosition();
        }
        var onMouseUp = function (upEvt) {
            upEvt.preventDefault();
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });


    // var housingTypeSort = function () {
    //     var nodeType = housingType.value;
    //     var newpinsHouse = pins.slice()
    //         .filter(function (pin) {
    //             if (nodeType === 'any') {
    //                 return pin.offer.type;
    //             } else {
    //                 return pin.offer.type === nodeType;
    //             }
    //         });
    //     utils.toArray(mapPins.querySelectorAll('.map__pin:not(.map__pin--main)')).forEach(function (pin) {
    //         pin.remove();
    //     });
    //     drawPins(newpinsHouse.slice(0, 5));
    // };




    // var priceSort = function () {
    //     var nodePrice = housingPrice.value;
    //     var newPinPrice = pins.slice()
    //         .filter(function (pin) {
    //             if (nodePrice === 'any') {
    //                 return pin.offer.price;
    //             } else if (pin.offer.price >= PriceRange[nodePrice].MIN && pin.offer.price <= PriceRange[nodePrice].MAX) {
    //                 return pin.offer.price
    //             }
    //         });
    //     utils.toArray(mapPins.querySelectorAll('.map__pin:not(.map__pin--main)')).forEach(function (pin) {
    //         pin.remove();
    //     });
    //     drawPins(newPinPrice.slice(0, 5));
    // }


    // var filtrationItem = function (it, item, key) {
    //     return it.value === 'any' ? true : it.value === item[key].toString();
    // };

    // var filtrationByType = function (item) {
    //     return filtrationItem(housingType, item.offer, 'type');
    // };

    // // var filtrationByPrice = function (item) {
    // //     var filteringPrice = PriceRange[priceSelect.value];
    // //     return filteringPrice ? item.offer.price >= filteringPrice.MIN && item.offer.price <= filteringPrice.MAX : true;
    // //   };

    // var filteredData = [];

    // var changeFilter = function () {
    //     utils.toArray(mapPins.querySelectorAll('.map__pin:not(.map__pin--main)')).forEach(function (pin) {
    //         pin.remove();
    //     });
    //     filteredData = pins.slice(0);
    //     console.log(filteredData)
    //     filteredData = filteredData.filter(filtrationByType);

    //     drawPins(filteredData);



    // }


    mapPinMain.addEventListener('dragstart', function () {
        return false;
    });


    mapPinMain.addEventListener('mousedown', activateMap);
    mapPinMain.addEventListener('keydown', handleEnterPress);
    // housingType.addEventListener('change', housingTypeSort);
    // mapFilters.addEventListener('change', changeFilter)


    return {
        addPins: addPins,
        drawPins: drawPins,
        setMainPinStartPosition: setMainPinStartPosition,
        mapPins: mapPins,


    };
})();