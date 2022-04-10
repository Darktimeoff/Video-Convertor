import { dirname, isAbsolute, join } from "path";
import { promises } from "fs";

export class FileService {
  private async isExist(path: string) {
    try {
      await promises.stat(path);
      return true;
    } catch {
      return false;
    }
  }

  public getFilePath(path: string, name: string, ext: string): string {
    let tmpPath = path;
    if (!isAbsolute(path)) {
      tmpPath = join(__dirname, +"/" + path);
    }
    return join(`${dirname(tmpPath)}/${name}.${ext}`);
  }

  async deletFileIfExtists(path: string) {
    if (await this.isExist(path)) {
      promises.unlink(path);
    }
  }
}
