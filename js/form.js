'use strict'
var form = (function () {


    let roomsAmount = {
        '1': ['1'],
        '2': ['2', '1'],
        '3': ['3', '2', '1'],
        '100': ['0']
    };

    let nameOfHousing = {
        bungalo: 0,
        flat: 1000,
        house: 5000,
        palace: 10000
    };
    let adFormReset = document.querySelector('.ad-form__reset');
    let roomNumber = document.querySelector('#room_number');
    let title = document.querySelector('#title');
    let typeOfHousing = document.querySelector('#type');
    let priceOfHousing = document.querySelector('#price');
    let timein = document.querySelector('#timein');
    let timeout = document.querySelector('#timeout');
    let chooseRoomForGuests = function () {
        let rooms = roomsAmount[roomNumber.value];
        console.log(roomNumber.value)
        let capacity = document.querySelector('#capacity');
        Object.values(capacity).forEach(function (value) {
            value.disabled = true;
            value.selected = false;
        })
        capacity.querySelectorAll('option').forEach(function (nodeOption) {
            for (let i = 0; i < rooms.length; i++) {
                if (nodeOption.value === rooms[i]) {
                    nodeOption.disabled = false;
                }
                if (nodeOption.value === rooms[0]) {
                    nodeOption.selected = true;

                }
            }
        })
    }

    let setPrice = function () {
        if (typeOfHousing.value) {
            priceOfHousing.placeholder = nameOfHousing[typeOfHousing.value]
        };
    };
    let timeinequallyTimeout = function (evt) {
        var selectTime = '';
        if (selectTime = evt.target.value) {
            console.log(selectTime)
            timeout.value = selectTime;
        }
        if (selectTime = evt.target.value) {
            timein.value = selectTime;
        }
    };


    title.addEventListener('input', function (evt) {
        let titleTarget = evt.target.value;
        if (titleTarget.length < 30) {
            title.setCustomValidity('Минимальная длина - 30 символов');
            return true;
        } else if (titleTarget.length > 100) {
            title.setCustomValidity('Максимальная длина 100 символов');
            return true;
        } else {
            title.setCustomValidity('');
        }
    })

    priceOfHousing.addEventListener('input', function (evt) {
        var regExp = /^\d+$/;
        let targetPrice = evt.target.value;
        let arrayPrice = targetPrice.split(' ')
        console.log(arrayPrice)
        let isSpecialSymbols = arrayPrice.every(function (elem) {
            return elem.match(regExp)
        })
        if (!isSpecialSymbols) {
            priceOfHousing.setCustomValidity('Только числа');
            return true;
        }
        if (targetPrice < nameOfHousing[typeOfHousing.value]) {
            priceOfHousing.setCustomValidity('Минимальное значение состовляет:' + nameOfHousing[typeOfHousing.value]);
            return true;
        }
        if (targetPrice > 1000000) {
            priceOfHousing.setCustomValidity('Максимальное значение 1000 000');
            return true;
        } else {
            priceOfHousing.setCustomValidity('');
        }
    })


    let resetForm = function () {
        Object.values(adForm.adForm).forEach(function (fieldset) {
            fieldset.innerHTML = '';
        });
    }
        adFormReset.addEventListener('click', resetForm)

        chooseRoomForGuests()
        roomNumber.addEventListener('change', chooseRoomForGuests);
        typeOfHousing.addEventListener('change', setPrice);
        timeout.addEventListener('change', timeinequallyTimeout);
        timein.addEventListener('change', timeinequallyTimeout);
    })();
