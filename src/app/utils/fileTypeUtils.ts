import { DirectoryKind, SeriesDirectory, FILETYPES } from "../modules/shared/models/Files"

export const isSeries = (dir: DirectoryKind): dir is SeriesDirectory => {
    return dir.type === FILETYPES.SERIES;
}
