import 'antd/es/button/style';
import _Button from 'antd/es/button';
import 'antd/es/message/style';
import _message from 'antd/es/message';

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }
    keys.push.apply(keys, symbols);
  }
  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(
          target,
          key,
          Object.getOwnPropertyDescriptor(source, key),
        );
      });
    }
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'next', value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'throw', err);
      }
      _next(undefined);
    });
  };
}

function _toConsumableArray(arr) {
  return (
    _arrayWithoutHoles(arr) ||
    _iterableToArray(arr) ||
    _unsupportedIterableToArray(arr) ||
    _nonIterableSpread()
  );
}

function _nonIterableSpread() {
  throw new TypeError(
    'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
  );
}

function _iterableToArray(iter) {
  if (
    (typeof Symbol !== 'undefined' && iter[Symbol.iterator] != null) ||
    iter['@@iterator'] != null
  )
    return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _slicedToArray(arr, i) {
  return (
    _arrayWithHoles(arr) ||
    _iterableToArrayLimit(arr, i) ||
    _unsupportedIterableToArray(arr, i) ||
    _nonIterableRest()
  );
}

function _nonIterableRest() {
  throw new TypeError(
    'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
  );
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === 'string') return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === 'Object' && o.constructor) n = o.constructor.name;
  if (n === 'Map' || n === 'Set') return Array.from(o);
  if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}

function _iterableToArrayLimit(arr, i) {
  var _i =
    arr == null
      ? null
      : (typeof Symbol !== 'undefined' && arr[Symbol.iterator]) ||
        arr['@@iterator'];
  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _s, _e;
  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i['return'] != null) _i['return']();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

import React, {
  useCallback,
  useMemo,
  useRef,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import Upload from 'rc-upload';
import {
  getFileItem,
  updateFileList,
  file2Obj,
  removeFileItem,
  getUid,
  commonErrorMessage,
} from './utils';
import useUpdate from 'ahooks/es/useUpdate';
import * as constants from './constant';
import axios from 'axios';
import MediaPreview from '@reamey/media-preview';
import FileList from './FileList';
import './index.less';
var CancelToken = axios.CancelToken;

var SortMediaUpload = function SortMediaUpload(_ref, ref) {
  var value = _ref.value,
    onChange = _ref.onChange,
    request = _ref.request,
    _ref$action = _ref.action,
    action = _ref$action === void 0 ? constants.DEFAULT_ACTION : _ref$action,
    _ref$limit = _ref.limit,
    limit = _ref$limit === void 0 ? constants.DEFAULT_LIMIT : _ref$limit,
    _ref$accepts = _ref.accepts,
    accepts =
      _ref$accepts === void 0 ? constants.DEFAULT_ACCEPTS : _ref$accepts,
    _ref$needSort = _ref.needSort,
    needSort =
      _ref$needSort === void 0 ? constants.DEFAULT_NEED_SORT : _ref$needSort,
    _ref$needCheckImgRati = _ref.needCheckImgRatio,
    needCheckImgRatio =
      _ref$needCheckImgRati === void 0
        ? constants.DEFAULT_NEED_CHECK_IMG_RATIO
        : _ref$needCheckImgRati;
  var dragBoxRef = useRef();
  var requestsRef = useRef({});
  var forceUpdate = useUpdate();

  var _useState = useState(null),
    _useState2 = _slicedToArray(_useState, 2),
    previewInfo = _useState2[0],
    setPreviewInfo = _useState2[1]; // console.log('value', value)

  var val2RcFiles = function val2RcFiles(arr) {
    return (arr || []).map(function (ossFile, i) {
      var fileUrl = ossFile.fileUrl;
      var startIndex =
        fileUrl === null || fileUrl === void 0
          ? void 0
          : fileUrl.lastIndexOf('/');
      var queryIndex =
        fileUrl === null || fileUrl === void 0
          ? void 0
          : fileUrl.lastIndexOf('?');
      var fileName =
        fileUrl === null || fileUrl === void 0
          ? void 0
          : fileUrl.slice(
              startIndex,
              queryIndex === -1 ? fileUrl.length : queryIndex,
            ); // const suffix = fileName.slice(fileName.lastIndexOf('.'), fileName.length)

      return {
        name: fileName,
        url: fileUrl,
        status: 'uploaded',
        uid: getUid(i),
        ossFile: ossFile,
      };
    });
  }; // 处理value 回现

  var fileListRef = useRef(val2RcFiles(value));
  useEffect(
    function () {
      if (value instanceof Array) {
        var newVals = value.filter(function (val) {
          return !fileListRef.current.some(function (v) {
            return v.url === val.fileUrl;
          });
        });

        if (newVals.length) {
          var news = val2RcFiles(newVals); // console.log('newVals', newVals)
          // console.log('news', news)

          fileListRef.current = [].concat(
            _toConsumableArray(news),
            _toConsumableArray(fileListRef.current),
          );
          forceUpdate();
        }
      }
    },
    [value],
  );
  var reset = useCallback(
    function () {
      Object.values(requestsRef.current).forEach(function (item) {
        return item && item.abort && item.abort();
      });
      fileListRef.current = [];
      onChange && onChange([]);
    },
    [onChange],
  );
  useImperativeHandle(
    ref,
    function () {
      return {
        reset: reset,
      };
    },
    [reset],
  );
  var currentLength = fileListRef.current.length;
  var shouldHasButton = limit > currentLength;

  var fileList2Value = function fileList2Value() {
    return fileListRef.current
      .filter(function (item) {
        return item.status === 'uploaded';
      })
      .map(function (_ref2) {
        var ossFile = _ref2.ossFile;
        return ossFile;
      });
  };

  var onFileChange = function onFileChange(type, file) {
    if (
      ['success', 'sort'].includes(type) ||
      (type === 'remove' &&
        (file === null || file === void 0 ? void 0 : file.status) ===
          'uploaded')
    ) {
      onChange && onChange(fileList2Value());
    }
  };

  useEffect(function () {
    return function () {
      // 卸载时 取消所有上传中的请求
      Object.values(requestsRef.current).forEach(function (item) {
        return item && item.abort && item.abort();
      });
    };
  }, []);
  var props = useMemo(
    function () {
      return {
        action: action,
        // type: 'drag',
        accept: accepts.join(','),
        multiple: true,
        directory: false,
        customRequest: function customRequest(_ref3) {
          var onProgress = _ref3.onProgress,
            onError = _ref3.onError,
            onSuccess = _ref3.onSuccess,
            data = _ref3.data,
            filename = _ref3.filename,
            file = _ref3.file,
            withCredentials = _ref3.withCredentials,
            action = _ref3.action,
            headers = _ref3.headers,
            method = _ref3.method,
            onStart = _ref3.onStart;

          // console.log('customRequest', file.uid)
          var uploadFunc = /*#__PURE__*/ (function () {
            var _ref4 = _asyncToGenerator(
              /*#__PURE__*/ regeneratorRuntime.mark(function _callee() {
                var formData, _data;

                return regeneratorRuntime.wrap(
                  function _callee$(_context) {
                    while (1) {
                      switch ((_context.prev = _context.next)) {
                        case 0:
                          formData = new FormData();
                          formData.append('file', file);
                          _context.prev = 2;
                          onStart && onStart(file);
                          _context.next = 6;
                          return request(action, {
                            method: 'POST',
                            headers: {
                              'Content-Type': 'multipart/form-data',
                            },
                            data: formData,
                            cancelToken: new CancelToken(function (c) {
                              return (requestsRef.current[file.uid] = {
                                abort: c,
                              });
                            }),
                            onUploadProgress: function onUploadProgress(e) {
                              // console.log('onUploadProgress', e);
                              if (e) {
                                var percent = parseInt(
                                  String((e.loaded / e.total) * 100),
                                ); // console.log('percent', percent, e.loaded, e.total);

                                // console.log('percent', percent, e.loaded, e.total);
                                onProgress(
                                  {
                                    percent: percent,
                                  },
                                  file,
                                );
                              }
                            },
                          });

                        case 6:
                          _data = _context.sent;
                          // console.log('data', data)
                          delete requestsRef.current[file.uid];
                          onSuccess && onSuccess(_data, file, null);
                          _context.next = 15;
                          break;

                        case 11:
                          _context.prev = 11;
                          _context.t0 = _context['catch'](2);
                          // console.log('customRequest error', error)
                          delete requestsRef.current[file.uid];
                          onError && onError(_context.t0, uploadFunc, file);

                        case 15:
                        case 'end':
                          return _context.stop();
                      }
                    }
                  },
                  _callee,
                  null,
                  [[2, 11]],
                );
              }),
            );

            return function uploadFunc() {
              return _ref4.apply(this, arguments);
            };
          })();

          uploadFunc();
        },
        beforeUpload: function beforeUpload(file, files) {
          var _file$name, _file$name$split, _file$name$split$pop;

          // console.log('beforeUpload', file)
          var suffix =
            '.' +
            (file === null || file === void 0
              ? void 0
              : (_file$name = file.name) === null || _file$name === void 0
              ? void 0
              : (_file$name$split = _file$name.split('.')) === null ||
                _file$name$split === void 0
              ? void 0
              : (_file$name$split$pop = _file$name$split.pop()) === null ||
                _file$name$split$pop === void 0
              ? void 0
              : _file$name$split$pop.toLowerCase());
          var isRightType = accepts.includes(suffix);
          var totalFiles = [].concat(
            _toConsumableArray(files),
            _toConsumableArray(fileListRef.current),
          );
          var totalNumber = totalFiles.length;
          var size = file.size / 1024 / 1024;

          if (totalNumber > limit) {
            commonErrorMessage(
              '\u4E0A\u4F20\u6587\u4EF6\u7684\u6570\u91CF\u9650\u5236\u4E3A\uFF1A'.concat(
                limit,
              ),
            );
            return Promise.reject();
          }

          if (!isRightType) {
            _message.error(
              '\u4E0A\u4F20\u6587\u4EF6\u7684\u7C7B\u578B\u9650\u5236\u4E3A\uFF1A'.concat(
                accepts.join(','),
              ),
            );

            return Promise.reject();
          }

          if (size > 200) {
            _message.error(
              '\u5355\u4E2A\u4E0A\u4F20\u6587\u4EF6\u5927\u5C0F\u9650\u5236\u5728200M\u4EE5\u5185',
            );

            return Promise.reject();
          }

          return file;
        },
        onStart: function onStart(file) {
          // console.log('onStart', data);
          var targetItem = file2Obj(file);
          targetItem.status = 'uploading';
          targetItem.percent = 0;
          fileListRef.current = updateFileList(targetItem, fileListRef.current);
          forceUpdate();
        },
        onSuccess: function onSuccess(result, file, xhr) {
          // console.log('onSuccess', result, file, xhr);
          try {
            if (typeof result === 'string') {
              result = JSON.parse(result);
            }
          } catch (e) {
            /* do nothing */
          } // removed

          if (!getFileItem(file, fileListRef.current)) {
            return;
          } // console.log('onSuccess', result)

          var targetItem = file2Obj(file);
          targetItem.status = 'uploaded';
          targetItem.percent = 100;
          targetItem.response = result;
          targetItem.url = result && result.fileUrl;
          targetItem.ossFile = result;
          fileListRef.current = updateFileList(targetItem, fileListRef.current); // console.log('fileListRef.current', fileListRef.current);
          // console.log('updateFileList(targetItem, fileListRef.current)', updateFileList(targetItem, fileListRef.current));

          forceUpdate();
          onFileChange('success');
        },
        onProgress: function onProgress(e, file) {
          if (!getFileItem(file, fileListRef.current)) {
            return;
          }

          var targetItem = file2Obj(file);
          targetItem.status = 'uploading';
          targetItem.percent = e.percent;
          fileListRef.current = updateFileList(targetItem, fileListRef.current);
          forceUpdate();
        },
        onError: function onError(error, retry, file) {
          if (!getFileItem(file, fileListRef.current)) {
            return;
          }

          var targetItem = file2Obj(file);
          targetItem.error = error;
          targetItem.retry = retry;
          targetItem.status = 'error';
          fileListRef.current = updateFileList(targetItem, fileListRef.current);
          forceUpdate();
          onFileChange('error');
        },
      };
    },
    [accepts, limit, action],
  ); // console.log('fileListRef.current', fileListRef.current);

  var setFileList = useCallback(function (fileList) {
    fileListRef.current = fileList;
    forceUpdate();
    onFileChange('sort');
  }, []);
  var onRemove = useCallback(function (file) {
    if (!getFileItem(file, fileListRef.current)) {
      return;
    }

    var requests = requestsRef.current[file.uid]; // console.log('file', file, requests)

    if (requests) {
      // console.log('originUploadRef.current.abort')
      requests.abort && requests.abort();
      delete requestsRef.current[file.uid];
    }

    fileListRef.current = removeFileItem(file, fileListRef.current);
    forceUpdate();
    onFileChange('remove', file); // console.log(originUploadRef);
  }, []);
  var onDragOver = useCallback(
    function (e) {
      e.preventDefault();

      if (!dragBoxRef.current) {
        return;
      }

      if (shouldHasButton) {
        dragBoxRef.current.style.borderColor = '#1890ff';
      } else {
        dragBoxRef.current.style.borderColor = 'red';
      }
    },
    [shouldHasButton],
  );
  var onDragLeave = useCallback(
    /*#__PURE__*/ (function () {
      var _ref5 = _asyncToGenerator(
        /*#__PURE__*/ regeneratorRuntime.mark(function _callee2(e) {
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch ((_context2.prev = _context2.next)) {
                case 0:
                  // console.log('onDragLeave', e)
                  e.preventDefault();

                  if (dragBoxRef.current) {
                    _context2.next = 3;
                    break;
                  }

                  return _context2.abrupt('return');

                case 3:
                  dragBoxRef.current.style.borderColor = '#dde0e9';

                case 4:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2);
        }),
      );

      return function (_x) {
        return _ref5.apply(this, arguments);
      };
    })(),
    [],
  );
  var onDrop = useCallback(
    /*#__PURE__*/ (function () {
      var _ref6 = _asyncToGenerator(
        /*#__PURE__*/ regeneratorRuntime.mark(function _callee3(e) {
          var originFileList, len, isAllowed, files, uploadFileList;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch ((_context3.prev = _context3.next)) {
                case 0:
                  // console.log('onDrop', e)
                  e.preventDefault();

                  if (dragBoxRef.current) {
                    _context3.next = 3;
                    break;
                  }

                  return _context3.abrupt('return');

                case 3:
                  originFileList = e.dataTransfer.files;
                  len = (originFileList && originFileList.length) || 0;
                  isAllowed = limit >= currentLength + len; // console.log('onDrop  originFileList.length', limit, originFileList.length, isAllowed, len, currentLength)

                  dragBoxRef.current.style.borderColor = '#dde0e9';

                  if (isAllowed) {
                    files = [];
                    Array.prototype.forEach.call(
                      originFileList,
                      function (v, i) {
                        v.uid = getUid(i);
                        files.push(v);
                      },
                    ); // originFileList.forEach((v, i) => {
                    //     v.uid = getUid(i)
                    //     files.push(v)
                    // })

                    uploadFileList = [];
                    files = files.map(function (file) {
                      return props.beforeUpload(file, files);
                    }); // console.log('uploadFileList', files)

                    files.forEach(function (file) {
                      if (file instanceof File) {
                        props.customRequest(
                          _objectSpread(
                            _objectSpread({}, props),
                            {},
                            {
                              file: file,
                            },
                          ),
                        );
                      }
                    });
                  } else {
                    _message.error(
                      '\u4E0A\u4F20\u6587\u4EF6\u7684\u6570\u91CF\u9650\u5236\u4E3A\uFF1A'.concat(
                        limit,
                      ),
                    ); // dragBoxRef.current.style.borderColor = 'red'
                  }

                case 8:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3);
        }),
      );

      return function (_x2) {
        return _ref6.apply(this, arguments);
      };
    })(),
    [props],
  );
  var onPreview = useCallback(function (url, name) {
    // console.log('onPreview url,name', url, name)
    setPreviewInfo({
      url: url,
      name: name,
    });
  }, []); // console.log('previewInfo', previewInfo)
  // console.log('fileListRef', fileListRef)

  return /*#__PURE__*/ React.createElement(
    'div',
    {
      className: 'sort-media-root',
    },
    !!previewInfo &&
      /*#__PURE__*/ React.createElement(MediaPreview, {
        autoPlay: true,
        wrapClassName: 'sort-media-preview-wapper',
        fileName: previewInfo.name,
        filePath: previewInfo.url,
        title: '预览',
        visible: true,
        onClose: function onClose() {
          setPreviewInfo(null);
        },
      }),
    /*#__PURE__*/ React.createElement(
      'div',
      {
        className: 'sort-media-drag-box',
        ref: dragBoxRef,
        onDragOver: onDragOver,
        onDrop: onDrop,
        onDragLeave: onDragLeave,
      },
      fileListRef.current && currentLength
        ? /*#__PURE__*/ React.createElement(FileList, {
            needSort: needSort,
            needCheckImgRatio: needCheckImgRatio,
            fileList: fileListRef.current,
            setFileList: setFileList,
            onRemove: onRemove,
            onPreview: onPreview,
          })
        : null,
      /*#__PURE__*/ React.createElement(
        'div',
        {
          className: 'sort-media-upload-button-box',
          style: {
            justifyContent: !currentLength ? 'center' : 'flex-start',
            alignItems: 'center',
          },
        },
        !currentLength &&
          /*#__PURE__*/ React.createElement(
            'span',
            null,
            '\u62D6\u62FD\u6587\u4EF6\u5230\u8FD9\u91CC\uFF0C\u6216\u8005',
          ),
        /*#__PURE__*/ React.createElement(
          Upload,
          _objectSpread({}, props),
          shouldHasButton &&
            /*#__PURE__*/ React.createElement(
              _Button,
              {
                type: 'primary',
              },
              fileListRef.current.length ? '继续上传' : '上传文件',
            ),
        ),
        fileListRef.current && currentLength
          ? /*#__PURE__*/ React.createElement(
              _Button,
              {
                style: {
                  width: '84px',
                },
                onClick: reset,
              },
              '清空',
            )
          : null,
      ),
    ),
  );
};

export default /*#__PURE__*/ forwardRef(SortMediaUpload);
