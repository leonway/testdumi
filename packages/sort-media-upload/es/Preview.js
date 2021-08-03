import "antd/es/button/style";
import _Button from "antd/es/button";
import "antd/es/progress/style";
import _Progress from "antd/es/progress";
import "antd/es/tooltip/style";
import _Tooltip from "antd/es/tooltip";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/// <reference path="../../../typings.d.ts" />
import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import { parseOnlineImage, parseLocalImage, parseVideo } from './utils';
import DragIcon from './assets/actions/move.svg';
import RemoveIcon from './assets/actions/remove.svg';
import PreviewIcon from './assets/actions/preview.svg';
import PreviewPlayIcon from './assets/actions/previewPlay.svg';
import PriviewVideo from './assets/png/priviewVideo.png';
import PriviewAudio from './assets/png/audioPreview.png';
import WarnIngIcon from './assets/png/warning.svg';
import Icon from '@ant-design/icons';
import * as constant from './constant';
import './Preview.less';
var count = 0;

var Preview = function Preview(_ref) {
  var _file$name, _file$name$split, _file$name$split$pop;

  var needSort = _ref.needSort,
      file = _ref.file,
      onRemove = _ref.onRemove,
      onPreview = _ref.onPreview,
      needCheckImgRatio = _ref.needCheckImgRatio;
  var originFileObj = file.originFileObj,
      name = file.name,
      status = file.status,
      percent = file.percent,
      url = file.url;

  var _useState = useState(),
      _useState2 = _slicedToArray(_useState, 2),
      previewUrl = _useState2[0],
      setPreviewUrl = _useState2[1];

  var _useState3 = useState(),
      _useState4 = _slicedToArray(_useState3, 2),
      info = _useState4[0],
      setInfo = _useState4[1];

  var extension = file === null || file === void 0 ? void 0 : (_file$name = file.name) === null || _file$name === void 0 ? void 0 : (_file$name$split = _file$name.split('.')) === null || _file$name$split === void 0 ? void 0 : (_file$name$split$pop = _file$name$split.pop()) === null || _file$name$split$pop === void 0 ? void 0 : _file$name$split$pop.toLowerCase();
  var isLocalImg = originFileObj && originFileObj.type.startsWith('image/');
  var isLocalVideo = originFileObj && originFileObj.type.startsWith('video/');
  var isLocalAudio = originFileObj && originFileObj.type.startsWith('audio/');
  var fileType = constant.EXTENSION_TO_MIME_TYPE_MAP[extension];
  var isImg = isLocalImg || fileType && fileType.startsWith('image/');
  var isVideo = isLocalVideo || fileType && fileType.startsWith('video/');
  var isAudio = isLocalAudio || fileType && fileType.startsWith('audio/'); // count++
  // console.log(file.uid, count);
  // const intl = useIntl();

  var setlocalImg = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(originFileObj) {
      var data, _url, width, height;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return parseLocalImage(originFileObj);

            case 3:
              data = _context.sent;

              if (data) {
                _url = data.url, width = data.width, height = data.height;
                setPreviewUrl(_url);
                setInfo({
                  width: width,
                  height: height
                });
              }

              _context.next = 10;
              break;

            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](0);
              console.log('setlocalImg error', _context.t0);

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 7]]);
    }));

    return function setlocalImg(_x) {
      return _ref2.apply(this, arguments);
    };
  }();

  var setRemoteImg = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(url) {
      var data;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return parseOnlineImage(url);

            case 3:
              data = _context2.sent;

              if (data) {
                setPreviewUrl(url);
                setInfo(data);
              }

              _context2.next = 10;
              break;

            case 7:
              _context2.prev = 7;
              _context2.t0 = _context2["catch"](0);
              console.log('setRemoteImg error', _context2.t0);

            case 10:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 7]]);
    }));

    return function setRemoteImg(_x2) {
      return _ref3.apply(this, arguments);
    };
  }();

  var setVideo = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var data;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return parseVideo(isLocalVideo ? originFileObj : url);

            case 3:
              data = _context3.sent;
              console.log('setVideo', data);

              if (data) {
                // setPreviewUrl(url)
                setInfo(data);
              }

              _context3.next = 11;
              break;

            case 8:
              _context3.prev = 8;
              _context3.t0 = _context3["catch"](0);
              console.log('setVideo error', _context3.t0);

            case 11:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 8]]);
    }));

    return function setVideo() {
      return _ref4.apply(this, arguments);
    };
  }();

  useEffect(function () {
    if (isImg) {
      if (isLocalImg) {
        setlocalImg(originFileObj);
      } else if (url) {
        setRemoteImg(url);
      }
    }

    if (isVideo) {
      setVideo();
    }
  }, []); // console.log('Preview', JSON.stringify(file));
  // console.log('onRemove', onRemove);
  // console.log('url,name', url, name);

  return /*#__PURE__*/React.createElement("div", {
    className: 'sort-media-preview-file-box'
  }, isImg && previewUrl && /*#__PURE__*/React.createElement("div", {
    className: 'sort-media-preview-preview-url',
    style: {
      background: "url(".concat(previewUrl, ") center no-repeat"),
      backgroundSize: 'cover',
      backgroundColor: '#eeeeee'
    }
  }), needCheckImgRatio && info && info.width && info.height && info.width / info.height !== 16 / 9 ? /*#__PURE__*/React.createElement(_Tooltip, {
    title: '长宽比例不合规则'
  }, /*#__PURE__*/React.createElement(Icon, {
    component: WarnIngIcon,
    className: 'sort-media-preview-warning-icon'
  })) : null, isVideo && /*#__PURE__*/React.createElement("img", {
    className: 'sort-media-preview-preview-url',
    src: PriviewVideo
  }), isAudio && /*#__PURE__*/React.createElement("img", {
    className: "sort-media-preview-preview-url",
    src: PriviewAudio
  }), /*#__PURE__*/React.createElement(Icon, {
    component: RemoveIcon,
    onClick: function onClick() {
      // console.log('onRemove img',);
      onRemove(file);
    },
    className: 'sort-media-preview-remove-icon'
  }), status === 'uploaded' && (isImg || isAudio || isVideo) && /*#__PURE__*/React.createElement(Icon, {
    component: isImg ? PreviewIcon : PreviewPlayIcon,
    onClick: function onClick() {
      onPreview(url, name);
    },
    className: 'sort-media-preview-preview-icon'
  }), status === 'uploaded' && needSort && /*#__PURE__*/React.createElement("div", {
    className: classnames('sort-media-preview-misk', 'sort-media-preview-drag-box')
  }, ' ', /*#__PURE__*/React.createElement(Icon, {
    component: DragIcon,
    className: 'sort-media-preview-drag-icon'
  }), "\u62D6\u62FD\u6392\u5E8F"), status === 'uploading' && /*#__PURE__*/React.createElement("div", {
    className: classnames('sort-media-preview-progress-box', 'sort-media-preview-misk')
  }, /*#__PURE__*/React.createElement("span", null, "\u4E0A\u4F20\u4E2D"), /*#__PURE__*/React.createElement(_Progress, {
    className: "sort-media-progress",
    status: "active",
    percent: percent,
    showInfo: false,
    strokeWidth: 4
  })), status === 'error' && /*#__PURE__*/React.createElement("div", {
    className: classnames('sort-media-preview-fail-box', 'sort-media-preview-misk')
  }, /*#__PURE__*/React.createElement("span", null, "\u4E0A\u4F20\u5931\u8D25"), /*#__PURE__*/React.createElement(_Button, {
    onClick: function onClick() {
      file && file.retry && file.retry();
    },
    size: 'small',
    style: {
      width: '46px',
      height: '20px',
      fontSize: '12px',
      padding: '0'
    },
    type: "primary"
  }, "\u91CD\u8BD5")));
};

export default Preview;