"use strict";
const utils_1 = require('./utils');
const fs_1 = require('fs');
/**
 * Crawls a JSONSchema's $refs, and returns a list of all
 * referenced schemas
 */
function collectRefs(schema) {
    const schemas = {};
    const $refs = [];
    utils_1.dft(schema, (value, key) => {
        if (key === '$ref')
            $refs.push(value);
    });
}
exports.collectRefs = collectRefs;
function readSchema(filename) {
    const contents = utils_1.Try(() => fs_1.readFileSync(filename), () => { throw new ReferenceError(`Unable to read file "${filename}"`); });
    return utils_1.Try(() => JSON.parse(contents.toString()), () => { throw new TypeError(`Error parsing JSON in file "${filename}"`); });
}
exports.readSchema = readSchema;
function getSchemaId(schema) {
    return schema.id || 'Interface1';
}
//# sourceMappingURL=refResolver.js.map