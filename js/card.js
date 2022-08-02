'use strict'
let cards = (function () {
    let createCardTemplate = function (card) {
        let cardTemplate = document.querySelector('#card').content.cloneNode(true);
        cardTemplate.querySelector('img').src = card.author.avatar;
        cardTemplate.querySelector('.popup__title').textContent = card.offer.title;
        cardTemplate.querySelector('.popup__text--address').textContent = card.offer.address;
        cardTemplate.querySelector('.popup__text--price').textContent = card.offer.price + ' ₽/ночь. ';
        cardTemplate.querySelector('.popup__type').textContent = card.offer.type;
        cardTemplate.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
        cardTemplate.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', ' + 'выезд до ' + card.offer.checkout;
        cardTemplate.querySelector('.popup__features').textContent = card.offer.features;
        cardTemplate.querySelector('.popup__description').textContent = card.description;
        return cardTemplate
    }

return {
    createCardTemplate: createCardTemplate
}


})();