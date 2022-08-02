var networkModule = (function () {

    var BASE_URL = 'https://javascript.pages.academy/keksobooking';
    var uploadForm = function (data, onSuccess, onError) {
        if (Math.random() > 0.5) {
            onSuccess()
        } 
        // else {
        //     onError();
        // }
    };

    var laodData = function (onSuccess, onError) {
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'json';

        xhr.addEventListener('load', function () {
            if (xhr.status === 200) {
                onSuccess(xhr);
            } else {
                onError();
            }
        });


        // xhr.addEventListener('error', function () {
        //     onError('Произошла ошибка соединения');
        // });

        // xhr.timeout = 10000; // 10s

        xhr.open('GET', BASE_URL + '/data');
        xhr.send();
    }

    return {
        uploadForm: uploadForm,
        laodData: laodData,
    }
})();