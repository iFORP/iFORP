import * as fs from 'fs-extra';
import * as path from 'path';

export function dummyFileUpload(fakeUploadedDirName: string) {
  const uploadDir = path.join(__dirname, '../../../../frontend/src/library');
  const NewDirectoryName = path.join(uploadDir, fakeUploadedDirName);
  const cssFile = path.join(NewDirectoryName, 'assets/css/app.bundle.css');
  const jsFile = path.join(NewDirectoryName, 'app/app.bundle.js');

  return new Promise((resolve, reject) => {
    fs
      .mkdirp(NewDirectoryName)
      .then(() => fs.createFile(cssFile))
      .then(() => fs.writeFile(cssFile, 'body { background: pink; }', 'utf8'))
      .then(() => fs.createFile(jsFile))
      .then(() => fs.writeFile(jsFile, 'console.log("Yeah");', 'utf8'))
      .then(() => resolve('Done with filesystem stuff.'))
      .catch(reason => reject(new Error(reason)));
  });
}
