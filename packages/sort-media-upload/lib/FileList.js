"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactSortableHoc = require("react-sortable-hoc");

require("./FileList.less");

var _Preview = _interopRequireDefault(require("./Preview"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MemoPreview = /*#__PURE__*/(0, _react.memo)(_Preview.default);
var SortableItem = /*#__PURE__*/(0, _react.memo)((0, _reactSortableHoc.SortableElement)(function (props) {
  return /*#__PURE__*/_react.default.createElement(_Preview.default, _objectSpread({}, props));
}));
var SortableContainerBox = (0, _reactSortableHoc.SortableContainer)(function (_ref) {
  var children = _ref.children;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "sort-media-preview-box"
  }, children);
});
var count = 0;

var FileList = function FileList(_ref2) {
  var fileList = _ref2.fileList,
      setFileList = _ref2.setFileList,
      onRemove = _ref2.onRemove,
      onPreview = _ref2.onPreview,
      needSort = _ref2.needSort,
      needCheckImgRatio = _ref2.needCheckImgRatio;

  var onSortEnd = function onSortEnd(_ref3) {
    var oldIndex = _ref3.oldIndex,
        newIndex = _ref3.newIndex;
    setFileList((0, _reactSortableHoc.arrayMove)(fileList, oldIndex, newIndex));
  }; // console.log('FileList', fileList);
  // count++
  // console.log('FileList count', count);


  if (!needSort) {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "sort-media-preview-box"
    }, ' ', fileList.map(function (file, index) {
      return /*#__PURE__*/_react.default.createElement(MemoPreview, {
        needCheckImgRatio: needCheckImgRatio,
        onPreview: onPreview,
        needSort: needSort,
        onRemove: onRemove,
        file: file,
        key: file.uid
      });
    }));
  }

  return /*#__PURE__*/_react.default.createElement(SortableContainerBox, {
    distance: 1,
    axis: 'xy',
    onSortEnd: onSortEnd
  }, fileList.map(function (file, index) {
    return /*#__PURE__*/_react.default.createElement(SortableItem, {
      needCheckImgRatio: needCheckImgRatio,
      needSort: needSort,
      onPreview: onPreview,
      onRemove: onRemove,
      disabled: !(file && file.status == 'uploaded'),
      file: file,
      key: file.uid,
      index: index
    });
  }));
};

var _default = FileList;
exports.default = _default;