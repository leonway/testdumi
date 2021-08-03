export type Status = 'uploading' | 'uploaded' | 'error';

export interface OssFile {
  fileMd5?: string;
  filePath?: string;
  fileSize?: number;
  fileUrl?: string;
}
export interface RCFile extends File {
  name: string;
  url: string;
  ossFile?: OssFile;
  previewUrl?: string;
  status: Status;
  [prop: string]: any;
}

export interface Requests {
  [prop: string]: { abort: Function };
}
export type ExtensionKeys = 'jpeg' | 'jpg' | 'mp3' | 'mp4' | 'png';

export type FileChangeType = 'success' | 'sort' | 'remove' | 'error';

export type Accept =
  | '.avi'
  | '.mp4'
  | '.mp3'
  | '.mkv'
  | '.mov'
  | '.jpeg'
  | '.jpg'
  | '.png';

// 由于设计该组件 同时只允许上传img 或者video 其中一种  所以 用此状态描述当前组件允许上传的文件类型
export type CurrentType = 'video' | 'img' | 'both';

export interface Info {
  width?: number;
  height?: number;
  url?: string;
}
