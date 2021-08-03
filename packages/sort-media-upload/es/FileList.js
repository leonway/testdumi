function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// @ts-nocheck
import React, { memo } from 'react';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';
import './FileList.less';
import Preview from './Preview';
var MemoPreview = /*#__PURE__*/memo(Preview);
var SortableItem = /*#__PURE__*/memo(SortableElement(function (props) {
  return /*#__PURE__*/React.createElement(Preview, _objectSpread({}, props));
}));
var SortableContainerBox = SortableContainer(function (_ref) {
  var children = _ref.children;
  return /*#__PURE__*/React.createElement("div", {
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
    setFileList(arrayMove(fileList, oldIndex, newIndex));
  }; // console.log('FileList', fileList);
  // count++
  // console.log('FileList count', count);


  if (!needSort) {
    return /*#__PURE__*/React.createElement("div", {
      className: "sort-media-preview-box"
    }, ' ', fileList.map(function (file, index) {
      return /*#__PURE__*/React.createElement(MemoPreview, {
        needCheckImgRatio: needCheckImgRatio,
        onPreview: onPreview,
        needSort: needSort,
        onRemove: onRemove,
        file: file,
        key: file.uid
      });
    }));
  }

  return /*#__PURE__*/React.createElement(SortableContainerBox, {
    distance: 1,
    axis: 'xy',
    onSortEnd: onSortEnd
  }, fileList.map(function (file, index) {
    return /*#__PURE__*/React.createElement(SortableItem, {
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

export default FileList;