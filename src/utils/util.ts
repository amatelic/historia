import * as path from 'path';
import * as fs from 'fs';

export const delay = (timeout: number) => new Promise((resolve) => setTimeout(resolve, timeout));

export function writeFileSyncRecursive(filename: string, content: string, charset = 'utf8') {
  const folders = filename.split(path.sep).slice(0, -1)
  if (folders.length) {
    // create folder path if it doesn't exist
    folders.reduce((last, folder) => {
      const folderPath = last ? last + path.sep + folder : folder
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath)
      }
      return folderPath
    })
  }
  fs.writeFileSync(filename, content, charset)
}


export const go = <T>(promise: Promise<T>) => {
  return promise
  .then(value => [null, value])
  .catch(err => [err, null]);
} 