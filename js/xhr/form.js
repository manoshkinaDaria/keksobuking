'use strict'
var form = (function () {
    map.setMainPinStartPosition();

    var roomsAmount = {
        '1': ['1'],
        '2': ['2', '1'],
        '3': ['3', '2', '1'],
        '100': ['0']
    };

    var nameOfHousing = {
        bungalo: 0,
        flat: 1000,
        house: 5000,
        palace: 10000
    };

    var type = document.querySelector('#type');
    var roomNumber = document.querySelector('#room_number');
    var price = document.querySelector('#price');
    var max = 1000000;
    var adFormSubmit = document.querySelector('.ad-form__submit');
    var timein = document.querySelector('#timein');
    var timeout = document.querySelector('#timeout');
    var adForm = document.querySelector('.ad-form');
    var success = document.querySelector('#success').content;

    var validateСhekIn = function () {
        var rooms = roomsAmount[roomNumber.value];
        var capacity = document.querySelector('#capacity');

        Object.values(capacity).forEach(function (value) {
            value.disabled = true;
            value.selected = false;
        });

        capacity.querySelectorAll('option').forEach(function (nodeOption) {
            for (var i = 0; i < rooms.length; i++) {
                if (nodeOption.value === rooms[i]) {
                    nodeOption.disabled = false;
                }
                if (nodeOption.value === rooms[0]) {
                    nodeOption.selected = true;

                }
            }
        })
    };



    var updateMinPrice = function () {
        var placeholderPrice = nameOfHousing[type.value];
        price.placeholder = placeholderPrice;
    };


    var priceValidity = function (priceOfHousing) {
        var error = '';
        var regExp = /^\d+$/;
        var isSpecialSymbols = priceOfHousing.every(function (item) {
            return item.match(regExp);
        });
        if (priceOfHousing > max) {
            error = 'Максимальная цена составляет 1000 000';
        }
        if (priceOfHousing < nameOfHousing[type.value]) {
            error = 'Минимальная цена: ' + nameOfHousing[type.value] + 'руб';
        } if (!isSpecialSymbols) {
            error = 'Только числа';
        }
        return error;
    }

    var validatePrice = function () {
        var priceValidationMessage = priceValidity(price.value.split(' '));
        if (priceValidationMessage) {
            price.setCustomValidity(priceValidationMessage);

        } else {
            adFormSubmit.disabled = false;
            price.setCustomValidity('');
        }
        price.reportValidity();
    }

    var timeinequallyTimeout = function (evt) {
        var selectTime = '';
        if (selectTime = evt.target.value) {
            timeout.value = selectTime;
        }
        if (selectTime = evt.target.value) {
            timein.value = selectTime;
        }
    };

    var onFormSuccess = function () {
        document.body.appendChild(success)

    }

    adForm.addEventListener('submit', function (e) {
        e.preventDefault();
        networkModule.uploadForm(new FormData(adForm), onFormSuccess);
    })


    type.addEventListener('change', updateMinPrice);
    price.addEventListener('input', validatePrice);
    roomNumber.addEventListener('change', validateСhekIn);

    timein.addEventListener('change', timeinequallyTimeout);
    timeout.addEventListener('change', timeinequallyTimeout);

    validateСhekIn();
})();
