/// <reference path="../../../typings.d.ts" />
import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
// import { useIntl } from 'react-intl';
import { ExtensionKeys, RCFile, Info } from './index.d';
import { parseOnlineImage, parseLocalImage, parseVideo } from './utils';
import DragIcon from './assets/actions/move.svg';
import RemoveIcon from './assets/actions/remove.svg';
import PreviewIcon from './assets/actions/preview.svg';
import PreviewPlayIcon from './assets/actions/previewPlay.svg';
import PriviewVideo from './assets/png/priviewVideo.png';
import PriviewAudio from './assets/png/audioPreview.png';
import WarnIngIcon from './assets/png/warning.svg';
import { Progress, Button, Tooltip } from 'antd';
import Icon from '@ant-design/icons';
import * as constant from './constant';
import './Preview.less';

interface PreviewProps {
  file: RCFile;
  onRemove: Function;
  onPreview: Function;
  needCheckImgRatio?: boolean;
  needSort?: boolean;
}
let count = 0;

const Preview: React.FC<PreviewProps> = ({
  needSort,
  file,
  onRemove,
  onPreview,
  needCheckImgRatio,
}) => {
  const { originFileObj, name, status, percent, url } = file;
  const [previewUrl, setPreviewUrl] = useState<string>();
  const [info, setInfo] = useState<Info>();
  const extension = file?.name?.split('.')?.pop()?.toLowerCase();
  const isLocalImg = originFileObj && originFileObj.type.startsWith('image/');
  const isLocalVideo = originFileObj && originFileObj.type.startsWith('video/');
  const isLocalAudio = originFileObj && originFileObj.type.startsWith('audio/');
  const fileType =
    constant.EXTENSION_TO_MIME_TYPE_MAP[extension as ExtensionKeys];
  const isImg = isLocalImg || (fileType && fileType.startsWith('image/'));
  const isVideo = isLocalVideo || (fileType && fileType.startsWith('video/'));
  const isAudio = isLocalAudio || (fileType && fileType.startsWith('audio/'));
  // count++
  // console.log(file.uid, count);
  // const intl = useIntl();

  const setlocalImg = async (originFileObj: File) => {
    try {
      const data = await parseLocalImage(originFileObj);
      if (data) {
        const { url, width, height } = data;
        setPreviewUrl(url);
        setInfo({ width, height });
      }
    } catch (error) {
      console.log('setlocalImg error', error);
    }
  };

  const setRemoteImg = async (url: string) => {
    try {
      const data = await parseOnlineImage(url);
      if (data) {
        setPreviewUrl(url);
        setInfo(data);
      }
    } catch (error) {
      console.log('setRemoteImg error', error);
    }
  };

  const setVideo = async () => {
    try {
      const data = await parseVideo(isLocalVideo ? originFileObj : url);
      console.log('setVideo', data);

      if (data) {
        // setPreviewUrl(url)
        setInfo(data);
      }
    } catch (error) {
      console.log('setVideo error', error);
    }
  };

  useEffect(() => {
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
  }, []);
  // console.log('Preview', JSON.stringify(file));
  // console.log('onRemove', onRemove);

  // console.log('url,name', url, name);

  return (
    <div className={'sort-media-preview-file-box'}>
      {isImg && previewUrl && (
        <div
          className={'sort-media-preview-preview-url'}
          style={{
            background: `url(${previewUrl}) center no-repeat`,
            backgroundSize: 'cover',
            backgroundColor: '#eeeeee',
          }}
        />
      )}
      {needCheckImgRatio &&
      info &&
      info.width &&
      info.height &&
      info.width / info.height !== 16 / 9 ? (
        <Tooltip title={'长宽比例不合规则'}>
          <Icon
            component={WarnIngIcon}
            className={'sort-media-preview-warning-icon'}
          />
        </Tooltip>
      ) : null}
      {isVideo && (
        <img className={'sort-media-preview-preview-url'} src={PriviewVideo} />
      )}
      {isAudio && (
        <img className="sort-media-preview-preview-url" src={PriviewAudio} />
      )}
      {/* {!previewUrl && <span className="dzu-previewFileName">{name}</span>} */}
      <Icon
        component={RemoveIcon}
        onClick={() => {
          // console.log('onRemove img',);
          onRemove(file);
        }}
        className={'sort-media-preview-remove-icon'}
      />
      {status === 'uploaded' && (isImg || isAudio || isVideo) && (
        <Icon
          component={isImg ? PreviewIcon : PreviewPlayIcon}
          onClick={() => {
            onPreview(url, name);
          }}
          className={'sort-media-preview-preview-icon'}
        />
      )}
      {status === 'uploaded' && needSort && (
        <div
          className={classnames(
            'sort-media-preview-misk',
            'sort-media-preview-drag-box',
          )}
        >
          {' '}
          <Icon
            component={DragIcon}
            className={'sort-media-preview-drag-icon'}
          />
          拖拽排序
        </div>
      )}

      {status === 'uploading' && (
        <div
          className={classnames(
            'sort-media-preview-progress-box',
            'sort-media-preview-misk',
          )}
        >
          <span>上传中</span>
          <Progress
            className="sort-media-progress"
            status="active"
            percent={percent}
            showInfo={false}
            strokeWidth={4}
          />
        </div>
      )}

      {status === 'error' && (
        <div
          className={classnames(
            'sort-media-preview-fail-box',
            'sort-media-preview-misk',
          )}
        >
          <span>上传失败</span>
          <Button
            onClick={() => {
              file && file.retry && file.retry();
            }}
            size={'small'}
            style={{
              width: '46px',
              height: '20px',
              fontSize: '12px',
              padding: '0',
            }}
            type="primary"
          >
            重试
          </Button>
        </div>
      )}
    </div>
  );
};

export default Preview;
