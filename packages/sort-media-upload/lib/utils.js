"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFileItem = getFileItem;
exports.file2Obj = file2Obj;
exports.updateFileList = updateFileList;
exports.removeFileItem = removeFileItem;
exports.parseLocalImage = exports.parseOnlineImage = exports.parseVideo = exports.getUid = exports.commonErrorMessage = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/extends"));

var _antd = require("antd");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var commonErrorMessage = function commonErrorMessage(msg) {
  _antd.message.error({
    content: msg,
    key: 'CommonErrorMessage'
  });
};

exports.commonErrorMessage = commonErrorMessage;

function getFileItem(file, fileList) {
  var matchKey = file.uid !== undefined ? 'uid' : 'name';
  return fileList.filter(function (item) {
    return item[matchKey] === file[matchKey];
  })[0];
}

function file2Obj(file) {
  return (0, _extends2.default)((0, _extends2.default)({}, file), {
    lastModified: file.lastModified,
    lastModifiedDate: file.lastModifiedDate,
    name: file.name,
    size: file.size,
    type: file.type,
    uid: file.uid,
    percent: 0,
    originFileObj: file
  });
}

function updateFileList(file, fileList) {
  var newFileList = _toConsumableArray(fileList);

  var fileIndex = newFileList.findIndex(function (_ref) {
    var uid = _ref.uid;
    return uid === file.uid;
  });

  if (fileIndex === -1) {
    newFileList.push(file);
  } else {
    newFileList[fileIndex] = file;
  }

  return newFileList;
}

function removeFileItem(file, fileList) {
  var matchKey = file.uid !== undefined ? 'uid' : 'name';
  var removed = fileList.filter(function (item) {
    return item[matchKey] !== file[matchKey];
  });
  return removed;
}

var getUid = function getUid(index) {
  // eslint-disable-next-line no-plusplus
  return 'rc-upload-'.concat(String(+new Date()), '-').concat(String(index));
};

exports.getUid = getUid;

var isImageFileType = function isImageFileType(type) {
  return type.indexOf('image/') === 0;
};

var parseVideo = function parseVideo(data) {
  return new Promise(function (res) {
    window.URL = window.URL || window.webkitURL;
    var video = document.createElement('video');
    video.preload = 'metadata';

    video.onloadedmetadata = function () {
      window.URL.revokeObjectURL(video.src);
      res({
        width: video.videoWidth,
        height: video.videoHeight
      });
    };

    video.src = typeof data === 'string' ? data : window.URL.createObjectURL(data);
  });
}; // export const parseLocalVideo = (file) => {
//   return new Promise((res) => {
//     window.URL = window.URL || window.webkitURL
//     const video = document.createElement('video')
//     video.preload = 'metadata'
//     video.onloadedmetadata = function () {
//       window.URL.revokeObjectURL(video.src)
//       res({
//         width: video.videoWidth,
//         height: video.videoWidth,
//       })
//     }
//     video.src = URL.createObjectURL(file)
//   })
// }


exports.parseVideo = parseVideo;

var parseOnlineImage = function parseOnlineImage(url) {
  return new Promise(function (res) {
    var img = new Image();

    img.onload = function () {
      res({
        width: img.naturalWidth,
        height: img.naturalHeight
      });
    };

    img.src = url;
  });
};

exports.parseOnlineImage = parseOnlineImage;
var MEASURE_SIZE = 400;

var parseLocalImage = function parseLocalImage(file) {
  return new Promise(function (resolve) {
    if (!file.type || !isImageFileType(file.type)) {
      resolve(null);
      return;
    }

    var canvas = document.createElement('canvas');
    canvas.width = MEASURE_SIZE;
    canvas.height = MEASURE_SIZE;
    canvas.style.cssText = 'position: fixed; left: 0; top: 0; width: '.concat(String(MEASURE_SIZE), 'px; height: ').concat(String(MEASURE_SIZE), 'px; z-index: 9999; display: none;');
    document.body.appendChild(canvas);
    var ctx = canvas.getContext('2d');
    var img = new Image();

    img.onload = function () {
      var width = img.width,
          height = img.height;
      var drawWidth = MEASURE_SIZE;
      var drawHeight = MEASURE_SIZE;
      var offsetX = 0;
      var offsetY = 0;
      var r = width / height;

      if (width > height) {
        drawWidth = drawHeight * r; // offsetY = -(drawHeight - drawWidth) / 2;

        offsetX = -(drawWidth - drawHeight) / 2;
      } else {
        drawHeight = drawWidth / r;
        offsetY = -(drawHeight - drawWidth) / 2; // offsetX = -(drawWidth - drawHeight) / 2;
      }

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      var dataURL = canvas.toDataURL();
      document.body.removeChild(canvas);
      resolve({
        url: dataURL,
        width: width,
        height: height
      });
    };

    img.src = window.URL.createObjectURL(file);
  });
};

exports.parseLocalImage = parseLocalImage;