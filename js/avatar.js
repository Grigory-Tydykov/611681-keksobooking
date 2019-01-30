'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var avatarFileSelect = document.querySelector('.ad-form-header__input');
  var avatarDropZone = document.querySelector('.ad-form-header__drop-zone');
  var photoFileSelect = document.querySelector('.ad-form__input');
  var photoDropZone = document.querySelector('.ad-form__drop-zone');

  var addImgForm = function (file, field, cb) {
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        cb(field, reader);
      });

      reader.readAsDataURL(file);
    }
  };

  var addAvatar = function (field, reader) {
    field.src = reader.result;
  };

  var addPhoto = function (field, reader) {
    field.src = reader.result;
    window.data.previewPhoto.appendChild(field);
  };

  var onAvatarFileSelectChange = function () {
    var file = document.querySelector('.ad-form-header__input').files[0];
    addImgForm(file, window.data.previewAvatar, addAvatar);
  };
  avatarFileSelect.addEventListener('change', onAvatarFileSelectChange);

  var addFileSelectDrop = function (evt, field, cb) {
    evt.stopPropagation();
    evt.preventDefault();
    var file = evt.dataTransfer.files[0];
    addImgForm(file, field, cb);
  };

  var onСaptureFileDragover = function (evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy';
  };

  avatarDropZone.addEventListener('dragover', onСaptureFileDragover);
  avatarDropZone.addEventListener('drop', function (evt) {
    addFileSelectDrop(evt, window.data.previewAvatar, addAvatar);
  });

  var createImg = function () {
    var img = document.createElement('img');
    img.width = '70';
    img.height = '70';
    img.alt = 'Фотография жилья';
    return img;
  };
  var onPhotoFileSelectChange = function () {
    var file = document.querySelector('.ad-form__input').files[0];
    var field = createImg();
    addImgForm(file, field, addPhoto);
  };
  photoFileSelect.addEventListener('change', onPhotoFileSelectChange);

  photoDropZone.addEventListener('dragover', onСaptureFileDragover);
  photoDropZone.addEventListener('drop', function (evt) {
    var field = createImg();
    addFileSelectDrop(evt, field, addPhoto);
  });

  window.avatar.removePhoto = function () {
    var photo = window.data.previewPhoto.children;
    if (photo) {
      for (var i = photo.length - 1; i >= 0; i--) {
        window.data.previewPhoto.removeChild(photo[i]);
      }
      return;
    }
  };
})();
