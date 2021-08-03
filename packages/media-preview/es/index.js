import "antd/es/modal/style";
import _Modal from "antd/es/modal";
import React from 'react';

var previewMedia = function previewMedia(_ref) {
  var fileName = _ref.fileName,
      filePath = _ref.filePath,
      title = _ref.title,
      visible = _ref.visible,
      onClose = _ref.onClose,
      wrapClassName = _ref.wrapClassName,
      autoPlay = _ref.autoPlay;

  if (!filePath) {
    return /*#__PURE__*/React.createElement("span", null);
  }

  var preview = /*#__PURE__*/React.createElement("div", null, '不支持这个文件'); // 预览视频

  if (filePath.toLocaleLowerCase().match(/\.mp4/)) {
    preview = /*#__PURE__*/React.createElement("video", {
      autoPlay: autoPlay,
      controls: true,
      style: {
        maxWidth: '100%',
        maxHeight: '100%'
      }
    }, /*#__PURE__*/React.createElement("source", {
      src: filePath
    }));
  } // 音频


  if (filePath.toLocaleLowerCase().match(/\.mp3/)) {
    preview = /*#__PURE__*/React.createElement("audio", {
      autoPlay: autoPlay,
      controls: true,
      src: filePath
    });
  } // 图片


  if (filePath.toLocaleLowerCase().match(/\.(jpeg|jpg|gif|png)/) || filePath.indexOf('data:image') === 0) {
    preview = /*#__PURE__*/React.createElement("img", {
      style: {
        maxWidth: '100%',
        maxHeight: '100%'
      },
      src: filePath
    });
  } // const modal = Modal.info({
  //   title: (
  //     <div className="preview-media-title">
  //       <span>预览</span>
  //       <a className="preview-media-close" onClick={() => modal.destroy()}><Icon type="close" /></a>
  //     </div>
  //   ),
  //   content: preview,
  //   width: 720,
  //   className: 'media-preview-modal'
  // })


  return /*#__PURE__*/React.createElement(_Modal, {
    width: 720,
    visible: visible,
    onCancel: function onCancel() {
      onClose();
    },
    wrapClassName: wrapClassName,
    footer: false,
    title: title
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, visible ? preview : /*#__PURE__*/React.createElement("span", null)));
};

export default previewMedia;