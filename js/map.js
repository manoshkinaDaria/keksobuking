'use strict'
let map = (function () {
    let mapFiltersContainer = document.querySelector('.map__filters-container');
    let adForm = document.querySelector('.ad-form');
    let mapOverlay = document.querySelector('.map__overlay');
    let address = document.querySelector('#address')
    window.globalMap = document.querySelector('.map');
    let mapPinMain = globalMap.querySelector('.map__pin--main');
    window.mapPins = document.querySelector('.map__pins');

    let PINWIDTH = 65;
    let PINHEIGHT = 84;
    let MAX_TOP = 130;
    let MAX_BOTTOM = 630;
    let MAX_RIGHT = 1135;
    let MAX_LEFT = 0;

    let fragment = document.createDocumentFragment();
    let drawPinsOnMap = function (array) {
        utils.toArray(array).forEach(function (card) {
            fragment.appendChild(createPin.renderPin(card));
        })
        mapPins.appendChild(fragment);
    }

    Object.values(adForm).forEach(function (fieldset) {
        fieldset.disabled = true;
    });

    let activateMap = function () {
        Object.values(adForm).forEach(function (fieldset) {
            fieldset.disabled = false;
            globalMap.classList.remove('map--faded');
            adForm.classList.remove('ad-form--disabled');

        });
        drawPinsOnMap(data.cardsCollection);
        mapPinMain.removeEventListener('mousedown', activateMap);
    }

    mapPinMain.addEventListener('mousedown', function () {
        mapPinMain.onclick = function () {
            activateMap()
        }
    })

    let onEnterPress = function (evt) {
        utils.enter(evt, activateMap)
    }
    document.addEventListener('keydown', onEnterPress);

    let getCoords = function () {
        let startX = parseInt(mapPinMain.style.left, 10) + PINWIDTH / 2;
        let startY = parseInt(mapPinMain.style.top, 10) + PINHEIGHT / 2;
        return address.value = startX + ' , ' + startY
    }
    getCoords()

    mapPinMain.addEventListener('mousedown', function (evt) {
        evt.preventDefault();
        let startCoords = {
            x: evt.clientX,
            y: evt.clientY
        };

        let onMouseMove = function (moveEvt) {
            moveEvt.preventDefault()
            let shift = {
                x: startCoords.x - moveEvt.clientX,
                y: startCoords.y - moveEvt.clientY
            };

            startCoords = {
                x: moveEvt.clientX,
                y: moveEvt.clientY
            };

            mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px'
            mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px'

            if (mapPinMain.offsetLeft <= MAX_LEFT) {
                mapPinMain.style.left = MAX_LEFT + 'px';
            } else
                if (mapPinMain.offsetLeft >= MAX_RIGHT) {
                    mapPinMain.style.left = MAX_RIGHT + 'px';
                }
            if (mapPinMain.offsetTop <= MAX_TOP) {
                mapPinMain.style.top = MAX_TOP + 'px'
            }
            if (mapPinMain.offsetTop >= MAX_BOTTOM) {
                mapPinMain.style.top = MAX_BOTTOM + 'px'
            }
            getCoords()
        }


        let onMouseUp = function (upEvt) {
            upEvt.preventDefault();
            document.removeEventListener('mousemove', onMouseMove)
            document.removeEventListener('mouseup', onMouseUp)
        }
        document.addEventListener('mousemove', onMouseMove)
        document.addEventListener('mouseup', onMouseUp)

    }
    )
    return {
        getCoords: getCoords,
        drawPinsOnMap: drawPinsOnMap,
        adForm: adForm
    }


})();