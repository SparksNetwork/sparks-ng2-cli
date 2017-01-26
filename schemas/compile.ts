const fs = require('fs');
const path = require('path');
import * as glob from 'glob';
import * as async from 'async';
import * as R from 'ramda';
const {Compiler} = require('./json-schema-to-typescript/dist/index');

function objectsToSchemas(objects, cb) {
  cb(null,
    objects.reduce(function (acc, object) {
      if (!object['type']) {
        Object.keys(object).map(key => object[key])
        .forEach(i => acc.push(i));
      } else {
        acc.push(object);
      }
      return acc;
    }, [])
  );
}

interface FileBuffer {
  filename:string;
  data:Buffer;
}

interface FileJson {
  filename:string;
  data:any;
}

function fileWithBuffer(filename:string, cb:(err:any, fb:FileBuffer) => void) {
  fs.readFile(filename, (err, data) => {
    if(err) { return cb(err, null); }
    cb(null, { filename, data });
  });
}

function fileWithJson(file:FileBuffer, cb:(err:any, fj:FileJson) => void) {
  try {
    const data = JSON.parse(file.data as any)
    cb(null, {filename: file.filename, data});
  } catch(e) {
    cb(`${file.filename}: ${e}`, null);
  }
}

function readFileWithJson(filename:string, cb:(err:any, fj:FileJson) => void) {
  fileWithBuffer(filename, (err, fb) => {
    if(err) { return cb(err, null); }
    fileWithJson(fb, cb);
  });
}

export function allSchemas(cb) {
  async.waterfall([
    async.apply(glob, 'schemas/**/*.json'),
    function(files, cb) {
      cb(null, R.reject(f => f === 'schemas/schemas.json', files));
    },
    function(files, cb) {
      async.map(files, readFileWithJson, cb);
    },
    function(files, cb) {
      async.map(files, async.asyncify(R.prop('data')) as any, cb);
    },
    objectsToSchemas,
    function(nearlyAllSchemas, cb) {
      commandSchemas(function(err, commandSchemas) {
        if (err) { return cb(err); }
        cb(null, nearlyAllSchemas.concat(commandSchemas));
      })
    }
  ], cb);
}

export function commandSchemas(cb) {
  async.waterfall([
    async.apply(glob, 'schemas/commands/**/*.json'),
    function(files, cb) { async.map(files, fs.readFile, cb); },
    function(buffers, cb) { async.map(buffers, async.asyncify(JSON.parse) as any, cb); },
    objectsToSchemas,
    function(payloadSchemas, cb) {
      async.waterfall([
        async.apply(fs.readFile, 'schemas/command.json'),
        function(commandSchema, cb) {
          const schemas = [];

          payloadSchemas.forEach(function(payloadSchema) {
            const schema = JSON.parse(commandSchema);
            schema.id = `command.${payloadSchema.id}`;
            schema.properties.action = {
              type: "string",
              "enum": [schema.id.split('.').slice(-1)[0]]
            };
            schema.required.push('payload');
            schema.properties.payload = {"$ref": payloadSchema.id};
            schemas.push(schema);
          });

          cb(null, schemas);
        }
      ], cb)
    }
  ], cb);
}

export function readJsonFile(path, cb?) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, function (err, data) {
      if (err) { return reject(err); }
      let obj;

      try {
        obj = JSON.parse(data);
      } catch (err) {
        return reject(err);
      }

      resolve(obj);
    });
  })
  .then(obj => {
    if (cb) { cb(null, obj); }
    return obj;
  })
  .catch(err => {
    if (cb) { cb(err); }
    else { throw err; }
  });
}

export function readJsonFiles(dir, cb?) {
  const regex = /\.json$/;
  const test = regex.test.bind(regex);

  return new Promise((resolve, reject) => {
    fs.readdir(dir, function (err, files) {
      if (err) { return reject(err); }

      const jsonFiles = files.filter(test);

      Promise.all(
        jsonFiles
        .map(file => readJsonFile(path.join(dir, file)))
      )
      .then(objects => resolve(objects))
      .catch(err => reject(err));
    });
  })
  .then(objects => {
    if (cb) { cb(null, objects); }
    return objects;
  })
  .catch(err => {
    if (cb) { cb(err); }
    else { throw err; }
  });
}

const customData = ['update'];

export function propertyWithoutCustomData(property) {
  return JSON.parse(JSON.stringify(property, function(key, value) {
    if (customData.find(v => v === key)) { return undefined; }
    return value;
  }))
}

export function propertiesWithoutCustomData(properties) {
  return Object.keys(properties).reduce((acc, key) => {
    acc[key] = propertyWithoutCustomData(properties[key]);
    return acc;
  }, {});
}

export function allTypes(schemas, cb) {
  const schemasById = R.compose(
    R.indexBy(R.prop('id')),
    R.filter(R.prop('id')),
    R.values
  )(schemas);

  const compiler = new Compiler('schemas/schemas.json', {
    declareTypes: true,
    declareReferenced: false,
    schemas: schemasById
  });

  R.forEach(schema => {
    compiler.addSchema(schema);
  })(schemas);

  fs.writeFile('schemas/types.d.ts', compiler.toString(), cb)
}

allSchemas(function(err, schemas) {
  if (err) {
    console.error('Error: ', err);
    return;
  }

  const schemaData = JSON.stringify(schemas);

  fs.writeFile('schemas/schemas.json', schemaData, function(err) {
    if (err) { console.error('Error: ', err); }
    console.log('Wrote schemas.json');
  });

  allTypes(schemas, function(err) {
    if (err) { console.error('Error: ', err); }
    console.log('Wrote types.d.ts');
  });
});
