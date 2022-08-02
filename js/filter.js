'use strict'
let filter = (function () {

    let housingType = document.querySelector('#housing-type');
    let housingPrice = document.querySelector('#housing-price');
    let housingRooms = document.querySelector('#housing-rooms');
    let housingGuests = document.querySelector('#housing-guests');
    let mapFilters = document.querySelector('.map__filters');
    var housingFeatures = document.querySelector('#housing-features');
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

    let filtrateItem = function (it, item, key) {
        if (it.value === 'any') {
            return true;
        } else {
            return it.value === item[key].toString()
        }
    }
    let filtrateByType = function (item) {
        return filtrateItem(housingType, item.offer, 'type');
    };

    let filtrateByPrice = function (item) {
        let filteringPrice = PriceRange[housingPrice.value];
        console.log(filteringPrice)
        if (filteringPrice) {
            return item.offer.price >= filteringPrice.MIN && item.offer.price <= filteringPrice.MAX
        } else { return true }
    };

    let filtrateByRooms = function (item) {
        return filtrateItem(housingRooms, item.offer, 'rooms')
    };

    let filtrateByGuests = function (item) {
        return filtrateItem(housingGuests, item.offer, 'guests')
    };

    let filtrateByFeature = function (item) {
        let checkedFeaturesItem = housingFeatures.querySelectorAll('input:checked');
        return Array.from(checkedFeaturesItem).every(function (checkbox) {
            return item.offer.features.includes(checkbox.value)
        })
    }

    let pins = data.cardsCollection;

    let filteredData = [];

    let changeFilter = utils.debounce(function () {
        utils.toArray(mapPins.querySelectorAll('.map__pin:not(.map__pin--main)')).forEach(function (pin) {
            pin.remove();
            let mapCard = mapPins.querySelector('.map__card ')
            if (mapCard){
                mapCard.remove()
            }
        });
        filteredData = pins.slice(0);

        filteredData = filteredData.filter(filtrateByType).filter(filtrateByRooms).filter(filtrateByGuests).filter(filtrateByPrice)
            .filter(filtrateByFeature);
        console.log(filteredData)


        map.drawPinsOnMap(filteredData.slice(0, 5));
    });

    mapFilters.addEventListener('change', changeFilter);




})();