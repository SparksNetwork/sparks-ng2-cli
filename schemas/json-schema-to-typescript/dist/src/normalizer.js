"use strict";
const lodash_1 = require('lodash');
const rules = new Map();
// TODO: less opaque name
rules.set('Destructure unary types', schema => {
    if (schema.type && Array.isArray(schema.type) && schema.type.length === 1) {
        schema.type = schema.type[0];
    }
    return schema;
});
rules.set('Add empty `required` property if none is defined', schema => {
    if (schema.properties && !('required' in schema)) {
        schema.required = [];
    }
    return schema;
});
rules.set('Transform `required`=false to `required`=[]', schema => {
    if (schema.properties && schema.required === false) {
        schema.required = [];
    }
    return schema;
});
// TODO: default to empty schema (as per spec) instead
rules.set('Default additionalProperties to true', schema => {
    if (schema.properties && !('additionalProperties' in schema)) {
        schema.additionalProperties = true;
    }
    return schema;
});
// TODO: convert relative refs to absolute:
//  - "#" -> "file.json/#"
//  - "#/foo/bar" -> "file.json/foo/bar
// TODO: convert {$ref: '#/'} => {$ref: '#'}
// TODO: apply rules recursively
function normalize(schema) {
    let _schema = lodash_1.cloneDeep(schema);
    rules.forEach((rule, key) => {
        _schema = rule(_schema);
        console.info(`[Normalize] Applied rule: "${key}"`);
    });
    return _schema;
}
exports.normalize = normalize;
//# sourceMappingURL=normalizer.js.map