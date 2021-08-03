// @ts-nocheck
import _extends from '@babel/runtime/helpers/esm/extends';
import { message } from 'antd';
import { Info } from '.';
export const commonErrorMessage = (msg) => {
  message.error({
    content: msg,
    key: 'CommonErrorMessage',
  });
};

export function getFileItem(file, fileList) {
  var matchKey = file.uid !== undefined ? 'uid' : 'name';
  return fileList.filter(function (item) {
    return item[matchKey] === file[matchKey];
  })[0];
}

export function file2Obj(file) {
  return _extends(_extends({}, file), {
    lastModified: file.lastModified,
    lastModifiedDate: file.lastModifiedDate,
    name: file.name,
    size: file.size,
    type: file.type,
    uid: file.uid,
    percent: 0,
    originFileObj: file,
  });
}

export function updateFileList(file, fileList) {
  const newFileList = [...fileList];
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

export function removeFileItem(file, fileList) {
  var matchKey = file.uid !== undefined ? 'uid' : 'name';
  var removed = fileList.filter(function (item) {
    return item[matchKey] !== file[matchKey];
  });
  return removed;
}

export const getUid = (index: number) => {
  // eslint-disable-next-line no-plusplus
  return 'rc-upload-'.concat(String(+new Date()), '-').concat(String(index));
};

var isImageFileType = function isImageFileType(type) {
  return type.indexOf('image/') === 0;
};

export const parseVideo = (data: File | string) => {
  return new Promise((res: (info: Info) => void) => {
    window.URL = window.URL || window.webkitURL;
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.onloadedmetadata = function () {
      window.URL.revokeObjectURL(video.src);
      res({
        width: video.videoWidth,
        height: video.videoHeight,
      });
    };
    video.src =
      typeof data === 'string' ? data : window.URL.createObjectURL(data);
  });
};

// export const parseLocalVideo = (file) => {
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

export const parseOnlineImage = (url) => {
  return new Promise((res: (info: Info) => void) => {
    const img = new Image();
    img.onload = () => {
      res({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.src = url;
  });
};

var MEASURE_SIZE = 400;
export const parseLocalImage = (file) => {
  return new Promise(function (resolve: (info: Info) => void) {
    if (!file.type || !isImageFileType(file.type)) {
      resolve(null);
      return;
    }

    var canvas = document.createElement('canvas');
    canvas.width = MEASURE_SIZE;
    canvas.height = MEASURE_SIZE;
    canvas.style.cssText = 'position: fixed; left: 0; top: 0; width: '
      .concat(String(MEASURE_SIZE), 'px; height: ')
      .concat(String(MEASURE_SIZE), 'px; z-index: 9999; display: none;');
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

      const r = width / height;
      if (width > height) {
        drawWidth = drawHeight * r;
        // offsetY = -(drawHeight - drawWidth) / 2;
        offsetX = -(drawWidth - drawHeight) / 2;
      } else {
        drawHeight = drawWidth / r;
        offsetY = -(drawHeight - drawWidth) / 2;
        // offsetX = -(drawWidth - drawHeight) / 2;
      }

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      var dataURL = canvas.toDataURL();
      document.body.removeChild(canvas);
      resolve({
        url: dataURL,
        width,
        height,
      });
    };

    img.src = window.URL.createObjectURL(file);
  });
};
