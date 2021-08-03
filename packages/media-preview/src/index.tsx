import React from 'react';
import { Modal } from 'antd';
interface indexProps {
  wrapClassName?: string;
  autoPlay?: boolean;
  fileName?: string;
  filePath?: string;
  title: string;
  visible: boolean;
  onClose: Function;
}

const previewMedia: React.FC<indexProps> = ({
  fileName,
  filePath,
  title,
  visible,
  onClose,
  wrapClassName,
  autoPlay,
}) => {
  if (!filePath) {
    return <span />;
  }
  let preview = <div>{'不支持这个文件'}</div>;
  // 预览视频
  if (filePath.toLocaleLowerCase().match(/\.mp4/)) {
    preview = (
      <video
        autoPlay={autoPlay}
        controls
        style={{ maxWidth: '100%', maxHeight: '100%' }}
      >
        <source src={filePath} />
      </video>
    );
  }
  // 音频
  if (filePath.toLocaleLowerCase().match(/\.mp3/)) {
    preview = <audio autoPlay={autoPlay} controls src={filePath}></audio>;
  }

  // 图片
  if (
    filePath.toLocaleLowerCase().match(/\.(jpeg|jpg|gif|png)/) ||
    filePath.indexOf('data:image') === 0
  ) {
    preview = (
      <img style={{ maxWidth: '100%', maxHeight: '100%' }} src={filePath} />
    );
  }

  // const modal = Modal.info({
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

  return (
    <Modal
      width={720}
      visible={visible}
      onCancel={() => {
        onClose();
      }}
      wrapClassName={wrapClassName}
      footer={false}
      title={title}
    >
      <div style={{ textAlign: 'center' }}>{visible ? preview : <span />}</div>
    </Modal>
  );
};

export default previewMedia;
