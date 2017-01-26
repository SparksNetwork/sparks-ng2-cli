"use strict";
const lodash_1 = require('lodash');
const path_1 = require('path');
// TODO: pull out into a separate package
function Try(fn, err) {
    try {
        return fn();
    }
    catch (e) {
        return err(e);
    }
}
exports.Try = Try;
/**
 * Depth-first traversal
 */
function dft(object, cb) {
    for (let key in object) {
        if (!object.hasOwnProperty(key))
            continue;
        if (lodash_1.isPlainObject(object[key]))
            dft(object[key], cb);
        cb(object[key], key);
    }
}
exports.dft = dft;
/**
 * Avoid appending "Js" to top-level unnamed schemas
 */
function stripExtension(filename) {
    return path_1.basename(filename, '.js');
}
exports.stripExtension = stripExtension;
/**
 * Convert a string that might contain spaces or special characters to one that
 * can safely be used as a TypeScript interface or enum name
 */
function toSafeString(string) {
    return lodash_1.upperFirst(lodash_1.camelCase(string));
}
exports.toSafeString = toSafeString;
//# sourceMappingURL=utils.js.map