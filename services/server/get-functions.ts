import * as fs from 'fs';
import * as path from 'path';

export interface ServerFunction {
  name:string;
  stream:string;
  schemas:string[];
  fn:Function;
}

const functionsRoot = path.resolve(path.join(__dirname, '..', 'functions'));

export default function getFunctions():Promise<ServerFunction[]> {
  return new Promise((resolve, reject) => {
    fs.readdir(functionsRoot, (err, files) => {
      if(err) { return reject(err); }

      const functions = [];
      files.forEach(function (funcFolder) {
        fs.readFile(path.join(functionsRoot, funcFolder, 'function.json'), (err, data) => {
          if(err) { return reject(err); }

          const funcData = JSON.parse(data as any);
          funcData.name = funcFolder;
          const fn = require(path.join('..', 'functions', funcFolder));
          funcData.fn = fn.default ? fn.default : fn;
          functions.push(funcData);

          if(functions.length === files.length) {
            resolve(functions);
          }
        })
      });
    });
  });
}
