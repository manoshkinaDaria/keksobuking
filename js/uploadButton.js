'use strict';
(function () {
    var uploadFileHeader = document.querySelector('.ad-form__field');
    var headerPreview = document.querySelector('.ad-form-header__preview img');
    var uploadFile = document.querySelector('#avatar');
    var adFormPhoto = document.querySelector('.ad-form__photo');
    var images = document.querySelector('#images');
    var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

    function readFile(file, previewFile) {


        var fileName = file.name.toLowerCase();
        var matches = FILE_TYPES.some(function (it) {
            return fileName.endsWith(it);
        });
        if (matches) {
            var reader = new FileReader();
            reader.addEventListener('load', function () {
                var imageSource = reader.result
                previewFile.src = imageSource;
            });
        }
        reader.readAsDataURL(file);

    }


    var onFileChangeAvatar = function () {
        readFile(uploadFile.files[0], headerPreview);
    }



    var addPhotosHousing = function () {
        var image = new Image(70, 70);
        adFormPhoto.appendChild(image);

        readFile(images.files[0], image);



    }


    images.addEventListener('change', addPhotosHousing);
    uploadFile.addEventListener('change', onFileChangeAvatar);
})();