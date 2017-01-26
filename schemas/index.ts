import * as Ajv from 'ajv';
const schemas = require('../schemas.json');

export default function() {
  const ajv = Ajv({
    coerceTypes: true
  });
  schemas.forEach(schema => ajv.addSchema(schema));
  return ajv;
}
