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
import { message, Button } from 'antd';
import useUpdate from 'ahooks/es/useUpdate';
import {
  RCFile,
  OssFile,
  FileChangeType,
  CurrentType,
  Requests,
  Accept,
} from './index.d';
import * as constants from './constant';
import axios from 'axios';
import { AxiosRequestConfig, AxiosPromise } from 'axios/index';
import { UploadProps } from 'rc-upload/es';
import MediaPreview from '@reamey/media-preview';
import FileList from './FileList';
import './index.less';

const CancelToken = axios.CancelToken;
interface RcUploadProps {
  value?: OssFile[];
  onChange?: Function;
  request: (url: string, config?: AxiosRequestConfig) => AxiosPromise;
  action?: string;
  accepts?: Accept[];
  limit?: number;
  needSort?: boolean;
  needCheckImgRatio?: boolean;
}

interface SortMediaUploadInstance {
  reset: () => void;
}

const SortMediaUpload: React.FC<
  RcUploadProps & React.Ref<SortMediaUploadInstance>
> = (
  {
    value,
    onChange,
    request,
    action = constants.DEFAULT_ACTION,
    limit = constants.DEFAULT_LIMIT,
    accepts = constants.DEFAULT_ACCEPTS,
    needSort = constants.DEFAULT_NEED_SORT,
    needCheckImgRatio = constants.DEFAULT_NEED_CHECK_IMG_RATIO,
  },
  ref,
) => {
  const dragBoxRef = useRef<HTMLDivElement>();
  const requestsRef = useRef<Requests>({});
  const forceUpdate = useUpdate();
  const [previewInfo, setPreviewInfo] = useState<{
    url?: string;
    name?: string;
  } | null>(null);
  // console.log('value', value)

  const val2RcFiles = (arr?: OssFile[]) => {
    return (arr || []).map((ossFile, i) => {
      const { fileUrl } = ossFile;
      const startIndex = fileUrl?.lastIndexOf('/');
      const queryIndex = fileUrl?.lastIndexOf('?');
      const fileName = fileUrl?.slice(
        startIndex,
        queryIndex === -1 ? fileUrl.length : queryIndex,
      );
      // const suffix = fileName.slice(fileName.lastIndexOf('.'), fileName.length)
      return {
        name: fileName,
        url: fileUrl,
        status: 'uploaded',
        uid: getUid(i),
        ossFile,
      } as any;
    });
  };

  // 处理value 回现
  const fileListRef = useRef<RCFile[]>(val2RcFiles(value));
  useEffect(() => {
    if (value instanceof Array) {
      const newVals = value.filter(
        (val) => !fileListRef.current.some((v) => v.url === val.fileUrl),
      );

      if (newVals.length) {
        const news = val2RcFiles(newVals);
        // console.log('newVals', newVals)
        // console.log('news', news)
        fileListRef.current = [...news, ...fileListRef.current];
        forceUpdate();
      }
    }
  }, [value]);

  const reset = useCallback(() => {
    Object.values(requestsRef.current).forEach(
      (item) => item && item.abort && item.abort(),
    );
    fileListRef.current = [];
    onChange && onChange([]);
  }, [onChange]);

  useImperativeHandle(
    ref,
    () => ({
      reset,
    }),
    [reset],
  );

  const currentLength = fileListRef.current.length;
  const shouldHasButton = limit > currentLength;

  const fileList2Value = () => {
    return fileListRef.current
      .filter((item) => item.status === 'uploaded')
      .map(({ ossFile }) => ossFile);
  };
  const onFileChange = (type: FileChangeType, file?: RCFile) => {
    if (
      ['success', 'sort'].includes(type) ||
      (type === 'remove' && file?.status === 'uploaded')
    ) {
      onChange && onChange(fileList2Value());
    }
  };

  useEffect(() => {
    return () => {
      // 卸载时 取消所有上传中的请求
      Object.values(requestsRef.current).forEach(
        (item) => item && item.abort && item.abort(),
      );
    };
  }, []);

  const props = useMemo(
    (): UploadProps => ({
      action,
      // type: 'drag',
      accept: accepts.join(','),
      multiple: true,
      directory: false,
      customRequest({
        onProgress,
        onError,
        onSuccess,
        data,
        filename,
        file,
        withCredentials,
        action,
        headers,
        method,
        onStart,
      }: any) {
        // console.log('customRequest', file.uid)

        const uploadFunc = async () => {
          const formData = new FormData();
          formData.append('file', file);
          try {
            onStart && onStart(file);
            const data = await request(action, {
              method: 'POST',
              headers: { 'Content-Type': 'multipart/form-data' },
              data: formData,
              cancelToken: new CancelToken(
                (c) => (requestsRef.current[file.uid] = { abort: c }),
              ),
              onUploadProgress(e) {
                // console.log('onUploadProgress', e);
                if (e) {
                  const percent = parseInt(String((e.loaded / e.total) * 100));
                  // console.log('percent', percent, e.loaded, e.total);

                  onProgress({ percent }, file);
                }
              },
            });
            // console.log('data', data)

            delete requestsRef.current[file.uid];
            onSuccess && onSuccess(data, file, null);
          } catch (error) {
            // console.log('customRequest error', error)
            delete requestsRef.current[file.uid];
            onError && onError(error, uploadFunc, file);
          }
        };
        uploadFunc();
      },
      beforeUpload(file, files) {
        // console.log('beforeUpload', file)

        const suffix = '.' + file?.name?.split('.')?.pop()?.toLowerCase();
        const isRightType = accepts.includes(suffix);
        const totalFiles = [...files, ...fileListRef.current];
        const totalNumber = totalFiles.length;
        const size = file.size / 1024 / 1024;
        if (totalNumber > limit) {
          commonErrorMessage(`上传文件的数量限制为：${limit}`);
          return Promise.reject();
        }
        if (!isRightType) {
          message.error(`上传文件的类型限制为：${accepts.join(',')}`);
          return Promise.reject();
        }
        if (size > 200) {
          message.error(`单个上传文件大小限制在200M以内`);
          return Promise.reject();
        }
        return file;
      },
      onStart(file) {
        // console.log('onStart', data);
        var targetItem = file2Obj(file);
        targetItem.status = 'uploading';
        targetItem.percent = 0;
        fileListRef.current = updateFileList(targetItem, fileListRef.current);
        forceUpdate();
      },
      onSuccess(result: any, file, xhr) {
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
        }
        // console.log('onSuccess', result)

        var targetItem = file2Obj(file);
        targetItem.status = 'uploaded';
        targetItem.percent = 100;
        targetItem.response = result;
        targetItem.url = result && result.fileUrl;
        targetItem.ossFile = result;
        fileListRef.current = updateFileList(targetItem, fileListRef.current);
        // console.log('fileListRef.current', fileListRef.current);
        // console.log('updateFileList(targetItem, fileListRef.current)', updateFileList(targetItem, fileListRef.current));
        forceUpdate();
        onFileChange('success');
      },
      onProgress(e, file) {
        if (!getFileItem(file, fileListRef.current)) {
          return;
        }
        var targetItem = file2Obj(file);
        targetItem.status = 'uploading';
        targetItem.percent = e.percent;
        fileListRef.current = updateFileList(targetItem, fileListRef.current);
        forceUpdate();
      },
      onError(error, retry, file) {
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
    }),
    [accepts, limit, action],
  );
  // console.log('fileListRef.current', fileListRef.current);
  const setFileList = useCallback((fileList) => {
    fileListRef.current = fileList;
    forceUpdate();
    onFileChange('sort');
  }, []);
  const onRemove = useCallback((file) => {
    if (!getFileItem(file, fileListRef.current)) {
      return;
    }
    const requests = requestsRef.current[file.uid];
    // console.log('file', file, requests)

    if (requests) {
      // console.log('originUploadRef.current.abort')
      requests.abort && requests.abort();
      delete requestsRef.current[file.uid];
    }
    fileListRef.current = removeFileItem(file, fileListRef.current);
    forceUpdate();
    onFileChange('remove', file);
    // console.log(originUploadRef);
  }, []);
  const onDragOver = useCallback(
    (e) => {
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
  const onDragLeave = useCallback(async (e) => {
    // console.log('onDragLeave', e)
    e.preventDefault();
    if (!dragBoxRef.current) {
      return;
    }
    dragBoxRef.current.style.borderColor = '#dde0e9';
  }, []);
  const onDrop = useCallback(
    async (e) => {
      // console.log('onDrop', e)
      e.preventDefault();
      if (!dragBoxRef.current) {
        return;
      }
      const originFileList = e.dataTransfer.files;
      const len = (originFileList && originFileList.length) || 0;

      const isAllowed = limit >= currentLength + len;
      // console.log('onDrop  originFileList.length', limit, originFileList.length, isAllowed, len, currentLength)
      dragBoxRef.current.style.borderColor = '#dde0e9';
      if (isAllowed) {
        let files: any[] = [];
        Array.prototype.forEach.call(originFileList, (v, i) => {
          v.uid = getUid(i);
          files.push(v);
        });
        // originFileList.forEach((v, i) => {
        //     v.uid = getUid(i)
        //     files.push(v)
        // })
        let uploadFileList: any[] = [];
        files = files.map((file) => (props as any).beforeUpload(file, files));
        // console.log('uploadFileList', files)
        files.forEach((file) => {
          if (file instanceof File) {
            (props as any).customRequest({ ...props, file } as any);
          }
        });
      } else {
        message.error(`上传文件的数量限制为：${limit}`);
        // dragBoxRef.current.style.borderColor = 'red'
      }
    },
    [props],
  );

  const onPreview = useCallback((url, name?: string) => {
    // console.log('onPreview url,name', url, name)
    setPreviewInfo({ url, name });
  }, []);

  // console.log('previewInfo', previewInfo)
  // console.log('fileListRef', fileListRef)

  return (
    <div className={'sort-media-root'}>
      {!!previewInfo && (
        <MediaPreview
          autoPlay={true}
          wrapClassName="sort-media-preview-wapper"
          fileName={previewInfo.name}
          filePath={previewInfo.url}
          title={'预览'}
          visible={true}
          onClose={() => {
            setPreviewInfo(null);
          }}
        />
      )}
      <div
        className={'sort-media-drag-box'}
        ref={dragBoxRef as any}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onDragLeave={onDragLeave}
      >
        {fileListRef.current && currentLength ? (
          <FileList
            needSort={needSort}
            needCheckImgRatio={needCheckImgRatio}
            fileList={fileListRef.current}
            setFileList={setFileList}
            onRemove={onRemove}
            onPreview={onPreview}
          />
        ) : null}
        <div
          className={'sort-media-upload-button-box'}
          style={{
            justifyContent: !currentLength ? 'center' : 'flex-start',
            alignItems: 'center',
          }}
        >
          {!currentLength && <span>拖拽文件到这里，或者</span>}
          <Upload {...props}>
            {shouldHasButton && (
              <Button type="primary">
                {fileListRef.current.length ? '继续上传' : '上传文件'}
              </Button>
            )}
          </Upload>
          {fileListRef.current && currentLength ? (
            <Button style={{ width: '84px' }} onClick={reset}>
              {'清空'}
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default forwardRef(SortMediaUpload as any);
