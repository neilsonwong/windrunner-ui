import AniListData from './AniListData';

export const enum FILETYPES {
  BASE = 'BASE',
  BASIC = 'BASIC',
  DIR = 'DIRECTORY',
  SERIES = 'SERIES',
  VID = 'VIDEO',
  INVALID = 'INVALID'
};

// fast populated file for speed
export interface BaseFile {
  type: FILETYPES;
  filePath: string;
  name: string;
  rel: string;
}

export interface InvalidFile extends BaseFile { }

// base file with extra properties
export interface BasicFile extends BaseFile {
  id: string;
  size: number|undefined;
  created: string|undefined;
}

export interface Directory extends BasicFile {
  isSeriesLeafNode: Boolean;
  newFiles?: Array<string>;
}

export interface SeriesDirectory extends Directory {
  aniListData: AniListData;
}

export interface Video extends BasicFile {
  duration: number;
  thumbnail: Array<string>;
}

export type DirectoryKind = Directory | SeriesDirectory;
export type DetailKind = DirectoryKind | Video;
export type FileKind = BaseFile | InvalidFile | BasicFile | DetailKind;