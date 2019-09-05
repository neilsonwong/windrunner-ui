import { FileType } from './FileType';

export class FileData {
    id: string;
    name: string;
    path: string;
    rel: string;
    type: FileType;
    size: number;
    birthTime: string;
    metadata: any;
}
