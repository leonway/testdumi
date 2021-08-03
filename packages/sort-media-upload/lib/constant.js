"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_ACCEPTS = exports.DEFAULT_LIMIT = exports.DEFAULT_IMG_RATIO = exports.DEFAULT_NEED_SORT = exports.DEFAULT_NEED_CHECK_IMG_RATIO = exports.DEFAULT_ACTION = exports.EXTENSION_TO_MIME_TYPE_MAP = void 0;
var EXTENSION_TO_MIME_TYPE_MAP = {
  // avi: 'video/avi',
  // gif: 'image/gif',
  // ico: 'image/x-icon',
  jpeg: 'image/jpeg',
  jpg: 'image/jpeg',
  // mkv: 'video/x-matroska',
  // mov: 'video/quicktime',
  mp4: 'video/mp4',
  mp3: 'audio/mpeg',
  // pdf: 'application/pdf',
  png: 'image/png' // zip: 'application/zip'

};
exports.EXTENSION_TO_MIME_TYPE_MAP = EXTENSION_TO_MIME_TYPE_MAP;
var DEFAULT_ACTION = '/armaz/v1/project/uploadResourceInfo';
exports.DEFAULT_ACTION = DEFAULT_ACTION;
var DEFAULT_NEED_CHECK_IMG_RATIO = true;
exports.DEFAULT_NEED_CHECK_IMG_RATIO = DEFAULT_NEED_CHECK_IMG_RATIO;
var DEFAULT_NEED_SORT = true;
exports.DEFAULT_NEED_SORT = DEFAULT_NEED_SORT;
var DEFAULT_IMG_RATIO = 16 / 9;
exports.DEFAULT_IMG_RATIO = DEFAULT_IMG_RATIO;
var DEFAULT_LIMIT = 5;
exports.DEFAULT_LIMIT = DEFAULT_LIMIT;
var DEFAULT_ACCEPTS = ['.png', '.jpg', '.jpeg', '.mp4', '.mp3'];
exports.DEFAULT_ACCEPTS = DEFAULT_ACCEPTS;