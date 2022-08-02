var utils = (function () {
    var ENTER = 'Enter';
    return {
        enter: function (evt, callback) {
            if (evt.key === ENTER) {
                callback();
            }
        },
        toArray: function (arrayLike) {
            return Array.prototype.slice.call(arrayLike);
        },
        shuffle: function (array) {
            var copy = array.slice()
            copy.sort(() => Math.random() - 0.5);
            return copy;
        }
    }
})();