import { SeriesDirectory, FILETYPES, FileKind, BaseFile, DetailKind, Video, DirectoryKind } from "../modules/shared/models/Files"

export const isVideo = (file: FileKind): file is Video => {
    return file.type === FILETYPES.VID;
}

export const isSeries = (dir: FileKind): dir is SeriesDirectory => {
    return dir.type === FILETYPES.SERIES;
}

export const isBaseFile = (file: FileKind): file is BaseFile => {
    return file.type === FILETYPES.BASE;
}

export const isDirectoryKind = (file: FileKind): file is DirectoryKind => {
    return (file.type === FILETYPES.DIR ||
            file.type === FILETYPES.SERIES);
}

export const isDetailKind = (file: FileKind): file is DetailKind => {
    return (file.type === FILETYPES.DIR ||
            file.type === FILETYPES.VID ||
            file.type === FILETYPES.SERIES);
}
