// @ts-nocheck
import React, { useEffect, memo } from 'react';
import {
  SortableContainer,
  SortableElement,
  arrayMove,
} from 'react-sortable-hoc';
// import arrayMove from 'array-move';
import { RCFile } from '.';
import './FileList.less';
import Preview from './Preview';

interface FileListProps {
  fileList: RCFile[];
  setList?: Function;
  setFileList: Function;
  onPreview: Function;
  onRemove: Function;
  needSort?: boolean;
  needCheckImgRatio?: boolean;
}

const MemoPreview = memo(Preview);
const SortableItem = memo(
  SortableElement((props: any) => <Preview {...props} />),
);
const SortableContainerBox = SortableContainer(({ children }) => {
  return <div className="sort-media-preview-box">{children}</div>;
});
let count = 0;
const FileList: React.FC<FileListProps> = ({
  fileList,
  setFileList,
  onRemove,
  onPreview,
  needSort,
  needCheckImgRatio,
}) => {
  const onSortEnd = ({ oldIndex, newIndex }) => {
    setFileList(arrayMove(fileList, oldIndex, newIndex));
  };
  // console.log('FileList', fileList);
  // count++
  // console.log('FileList count', count);
  if (!needSort) {
    return (
      <div className="sort-media-preview-box">
        {' '}
        {fileList.map((file, index) => {
          return (
            <MemoPreview
              needCheckImgRatio={needCheckImgRatio}
              onPreview={onPreview}
              needSort={needSort}
              onRemove={onRemove}
              file={file}
              key={file.uid}
            />
          );
        })}
      </div>
    );
  }

  return (
    <SortableContainerBox distance={1} axis={'xy'} onSortEnd={onSortEnd}>
      {fileList.map((file, index) => {
        return (
          <SortableItem
            needCheckImgRatio={needCheckImgRatio}
            needSort={needSort}
            onPreview={onPreview}
            onRemove={onRemove}
            disabled={!(file && file.status == 'uploaded')}
            file={file}
            key={file.uid}
            index={index}
          />
        );
      })}
    </SortableContainerBox>
  );
};

export default FileList;
