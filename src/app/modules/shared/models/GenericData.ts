import { DirectoryKind } from './Files';

export interface ResultData {
    result: boolean;
};

export interface FolderPathData {
    folder: string;
};

export interface RecentlyChangedData {
    changed: DirectoryKind[];
    promised?: string;
}