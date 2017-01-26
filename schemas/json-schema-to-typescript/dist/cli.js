#!/usr/bin/env node
"use strict";
var fs_1 = require('mz/fs');
var path_1 = require('path');
var index_1 = require('./index');
// require it instead of import till typings for stdin are not released
var stdin = require('stdin');
// require it instead of import till typings for minimist are kind of broken
var minimist = require('minimist');
var argv = minimist(process.argv.slice(2), {
    alias: {
        help: ['h'],
        input: ['i'],
        output: ['o']
    }
});
if (argv['help']) {
    printHelp();
    process.exit(0);
}
var argIn = argv._[0] || argv['input'];
var argOut = argv._[1] || argv['output'] || getOutFilePath(argIn);
readInput()
    .then(function (s) { return JSON.parse(s); })
    .then(function (schema) { return index_1.compile(schema, argIn); })
    .then(writeOutput)
    .then(function () { return process.exit(0); }, function (err) {
    process.stderr.write(err.message);
    process.exit(1);
});
function getOutFilePath(inFilePath) {
    if (!inFilePath) {
        return;
    }
    var outFileName = path_1.basename(inFilePath, '.json') + '.d.ts';
    return path_1.join(path_1.dirname(inFilePath), outFileName);
}
function readInput() {
    if (!argIn) {
        return new Promise(stdin);
    }
    return fs_1.readFile(argIn);
}
function writeOutput(compiled) {
    if (!argOut) {
        try {
            process.stdout.write(compiled);
            return Promise.resolve();
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    return fs_1.writeFile(argOut, compiled);
}
function printHelp() {
    var pkg = require('../package.json');
    process.stdout.write([
        (pkg.name + " " + pkg.version),
        'Usage: json2ts [--input, -i] [IN_FILE] [--output, -o] [OUT_FILE]',
        '',
        'With no IN_FILE, or when IN_FILE is -, read standard input.',
        'With no OUT_FILE and when IN_FILE is specified, create `.d.ts` file in the same directory.',
        'With no OUT_FILE nor IN_FILE, write to standard output.'
    ].join('\n'));
}
//# sourceMappingURL=cli.js.map