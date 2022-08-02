var utils = (function () {
    let ENTER = 'Enter';
    let ESCAPE = 'Escape'
    var DEBOUNCE_INTERVAL = 300;
    return {
        enter: function (evt, callback) {
            if (evt.key === ENTER) {
                callback();
            }
        },
        escape: function (evt, callback) {
            if (evt.key === ESCAPE) {
                callback();
            }
        },
        getRandomInt: function (min, max) {
            let rand = min + Math.random() * (max + 1 - min);
            return Math.floor(rand);
        },
        getRandom: function (min, max) {
            let newArray = [];
            for (let i = min; i < min + max; i++) {
                newArray.push(i)
                newArray.sort(() => Math.random() - 0.5)
            }
            return newArray
        },
        randomValue: function (array) {
            return array[Math.floor(array.length * Math.random())];
        },

        toArray: function (arrayLike) {
            return Array.prototype.slice.call(arrayLike);
        },
        shuffle: function (array) {
            var copy = array.slice()
            copy.sort(() => Math.random() - 0.5);
            return copy;

        }, debounce: function (cb) {
            var lastTimeout = null;

            return function () {
                var parameters = arguments;
                if (lastTimeout) {
                    window.clearTimeout(lastTimeout);
                }
                lastTimeout = window.setTimeout(function () {
                    cb.apply(null, parameters);
                }, DEBOUNCE_INTERVAL);
            };
        }




    }
})();