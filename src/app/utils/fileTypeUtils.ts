import { DirectoryKind, SeriesDirectory, FILETYPES, FileKind, BaseFile, DetailKind } from "../modules/shared/models/Files"

export const isSeries = (dir: DirectoryKind): dir is SeriesDirectory => {
    return dir.type === FILETYPES.SERIES;
}

export const isBaseFile = (file: FileKind): file is BaseFile => {
    return file.type === FILETYPES.BASE;
}

export const isDetailKind = (file: FileKind): file is DetailKind => {
    return (file.type === FILETYPES.DIR ||
            file.type === FILETYPES.VID ||
            file.type === FILETYPES.SERIES);
}
