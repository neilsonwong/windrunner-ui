import { FileData } from 'src/app/models/FileData';
import { FileType } from 'src/app/models/FileType';

export class FileDataContainer {
  watched: number;
  totalVideoCount: number;
  totalCount: number;
  lastUpdated: number;

  constructor() {}
  
  populate(contents: FileData[]) {
    if (contents && contents.length > 0) {
      let lastFileUpdate = 0;
      let totalVideoCount = 0;
      let watched = undefined;

      for (const item of contents) {
        // check if video
        if (item.type === FileType.VIDEO) {
          if (watched === undefined) {
            watched = 0;
          }
          ++totalVideoCount;
          // check if watched
          if (item.metadata && item.metadata.watchTime && item.metadata.totalTime &&
            item.metadata.watchTime >= item.metadata.totalTime) {
              ++watched;
            }
        }

        // lastUpdated
        const curDate = Date.parse(item.birthTime);
        if (curDate > lastFileUpdate) {
          lastFileUpdate = curDate;
        }
      }

      this.watched = watched;
      this.totalVideoCount = totalVideoCount;
      this.totalCount = contents.length;
      this.lastUpdated = lastFileUpdate;
    }
  }
}
