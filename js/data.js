'use strict'

var data = (function () {
    var titleArray = ["Уютное гнездышко для молодоженов", "Маленькая квартирка рядом с парком", "Небольшая лавочка в парке", "Императорский дворец в центре Токио", "Маленькая квартирка на чердаке. Для самых не требовательных."];
    var adressArray = ["102-0082 Tōkyō-to, Chiyoda-ku, Ichibanchō, 14−3", "102-0075 Tōkyō-to, Chiyoda-ku, Sanbanchō", "Chiyoda-ku, Tōkyō-to 102-0091", "1-1 Chiyoda, Chiyoda-ku, Tōkyō-to 100-8111"];
    var priceArray = ["42000", "30000", "100", "6000000", "10000", "20000", "5000", "100000"];
    var typeArray = ["palace", "flat", "house", "bungalo"];
    var checkinCheckoutArray = ["12:00", "13:00", "14:00"];
    var featuresArray = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
    var descriptionArray = ["Великолепная лавочка прямо в центре парка. Подходит для всех кто любит спать на свежем воздухе.", "Маленькая чистая квратира на краю парка. Без интернета, регистрации и СМС.", "Великолепный таун-хауз в центре Токио. Подходит как туристам, так и бизнесменам. Дом полностью укомплектован и имеет свежий ремонт.", "Замечательный дворец в старинном центре города. Только для тех кто может себе позволить дворец. Лакеев и прочих жокеев просим не беспокоить."];
    var photosArray = [
        "http://o0.github.io/assets/images/tokyo/hotel1.jpg",
        "http://o0.github.io/assets/images/tokyo/hotel2.jpg",
        "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
    ];

    let avatarArray = utils.getRandom(1, 8);



    let generateCard = function (array) {
        let allObjects = {};
        let author = {};
        author.avatar = 'img/avatars/user0' + array + '.png';
        let offer = {};
        offer.title = utils.randomValue(titleArray);
        offer.address = utils.randomValue(adressArray);
        offer.price = utils.randomValue(priceArray);
        offer.type = utils.randomValue(typeArray);
        offer.rooms = utils.randomValue(utils.getRandom(1, 8));
        offer.guests = utils.randomValue(utils.getRandom(1, 4));
        offer.checkin = utils.randomValue(checkinCheckoutArray);
        offer.checkout = utils.randomValue(checkinCheckoutArray);
        offer.features = utils.shuffle(featuresArray).slice(0, utils.randomValue(utils.getRandom(1, featuresArray.length)));
        offer.description = utils.randomValue(descriptionArray);
        offer.photos = utils.shuffle(photosArray).slice(0, utils.randomValue(utils.getRandom(1, descriptionArray.length)));
        let location = {};
        location.x = utils.getRandomInt(330, 999);
        location.y = utils.getRandomInt(130, 630);
        allObjects.author = author;
        allObjects.offer = offer;
        allObjects.location = location;
        return allObjects;
    }
    let createCardsArray = function () {
        let cardsArray = [];
        for (let i = 0; i < 8; i++) {
            cardsArray.push(generateCard(avatarArray[i]))
        }
        return cardsArray
    }

    let cardsCollection = createCardsArray();

    return {
        cardsCollection: cardsCollection
    }

})();