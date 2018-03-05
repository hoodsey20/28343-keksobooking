'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var photoContainerElement = document.querySelector('.form__photo-container');
  var photoInputElement = photoContainerElement.querySelector('input[type="file"]');

  var clearPreviews = function () {
    var previewElements = photoContainerElement.querySelectorAll('.form__photo');
    if (previewElements) {
      previewElements.forEach(function (element) {
        element.remove();
      });
    }
  };

  var createPreview = function (file) {
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();
      reader.readAsDataURL(file);

      reader.addEventListener('load', function () {
        var previewElement = document.createElement('div');
        previewElement.classList.add('form__photo');
        previewElement.style.backgroundImage = 'url(' + reader.result + ')';
        photoContainerElement.appendChild(previewElement);
      });
    }
  };

  photoInputElement.addEventListener('change', function () {
    clearPreviews();
    var uploadedfiles = photoInputElement.files;
    Object.keys(uploadedfiles).forEach(function (element) {
      createPreview(uploadedfiles[element]);
    });
  });
})();
