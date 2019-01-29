'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var avatarFileSelect = document.querySelector('.ad-form-header__input');
  var dropZone = document.querySelector('.ad-form-header__drop-zone');

  var addAvatarForm = function (file, field) {
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        field.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  var onFileSelectChange = function () {
    var file = document.querySelector('.ad-form-header__input').files[0];
    addAvatarForm(file, window.data.previewAvatar);
  };
  avatarFileSelect.addEventListener('change', onFileSelectChange);

  var onFileSelectDrop = function (evt) {
    evt.stopPropagation();
    evt.preventDefault();

    var file = evt.dataTransfer.files[0];
    addAvatarForm(file, window.data.previewAvatar);
  };

  var onСaptureFileDragover = function (evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy';
  };

  dropZone.addEventListener('dragover', onСaptureFileDragover);
  dropZone.addEventListener('drop', onFileSelectDrop);
})();
