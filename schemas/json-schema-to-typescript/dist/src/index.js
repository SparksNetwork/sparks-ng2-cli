"use strict";
const generator_1 = require('./generator');
const normalizer_1 = require('./normalizer');
const parser_1 = require('./parser');
const utils_1 = require('./utils');
const fs_1 = require('fs');
exports.DEFAULT_OPTIONS = {
    enableConstEnums: true,
    enableTrailingSemicolonForEnums: false,
    enableTrailingSemicolonForInterfaceProperties: true,
    enableTrailingSemicolonForInterfaces: false,
    enableTrailingSemicolonForTypes: true,
    indentWith: '  '
};
function compileFromFile(filename, options = exports.DEFAULT_OPTIONS) {
    const contents = utils_1.Try(() => fs_1.readFileSync(filename), () => { throw new ReferenceError(`Unable to read file "${filename}"`); });
    const schema = utils_1.Try(() => JSON.parse(contents.toString()), () => { throw new TypeError(`Error parsing JSON in file "${filename}"`); });
    return compile(schema, utils_1.stripExtension(filename), options);
}
exports.compileFromFile = compileFromFile;
function compile(schema, name, options = exports.DEFAULT_OPTIONS) {
    return generator_1.generate(parser_1.parse(normalizer_1.normalize(schema), name), Object.assign({}, exports.DEFAULT_OPTIONS, options));
}
exports.compile = compile;
//# sourceMappingURL=index.js.map