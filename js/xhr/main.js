document.addEventListener('DOMContentLoaded', function () {
    window.networkModule.laodData(function (xhr) {
        onDataLoadedSuccessfully(xhr.response);
        // В этот момент все данные загружены и готовы к работе

    }
        // , errorHandler
    );

    function onDataLoadedSuccessfully(applicationData) {
        map.addPins(applicationData);
    }

    // function errorHandler() {
    //     var messageError = document.querySelector('#error').content;
    //     var title = messageError.querySelector('h2');
    //     title.textContent = 'Ошибка на стороне сервера';
    //     messageError.querySelector('.error__button').classList.add('hidden')
    //     document.body.appendChild(messageError);
    // }
});
