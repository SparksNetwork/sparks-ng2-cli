"use strict";
const index_1 = require('./index');
const utils_1 = require('./utils');
// TODO: call for referenced types
// TODO: use discriminated union types to prevent asserts
function generate(ast, options = index_1.DEFAULT_OPTIONS) {
    return declareNamedInterfaces(ast, options)
        + declareEnums(ast, options).join('')
        + generateType(ast, options);
}
exports.generate = generate;
function declareEnums(ast, options) {
    if (ast.type === 'ENUM') {
        return [generateEnum(ast, options)];
    }
    if (ast.type === 'INTERFACE') {
        return ast.params
            .reduce((prev, cur) => prev.concat(declareEnums(cur, options)), [])
            .filter(Boolean);
    }
    return [];
}
function declareNamedInterfaces(ast, options) {
    return '';
}
function generateType(ast, options) {
    switch (ast.type) {
        case 'ANY': return 'any';
        case 'ARRAY': return generateType(ast.params, options) + '[]';
        case 'BOOLEAN': return 'boolean';
        case 'ENUM': return ast.name;
        case 'INTERFACE': return generateInterface(ast, options);
        case 'INTERSECTION': return generateSetOperation(ast, options);
        case 'LITERAL': return JSON.stringify(ast.params);
        case 'NUMBER': return 'number';
        case 'NULL': return 'null';
        // case 'OBJECT'
        // case 'REFERENCE'
        case 'STRING': return 'string';
        case 'TUPLE': return '[' + ast.params.map(_ => generateType(_, options)).join(', ') + ']';
        case 'UNION': return generateSetOperation(ast, options);
    }
}
/**
 * Generate a Union or Intersection
 */
function generateSetOperation(ast, options) {
    const members = ast.params.map(_ => generateType(_, options));
    const separator = ast.type === 'UNION' ? '|' : '&';
    return members.length === 1 ? members[0] : '(' + members.join(' ' + separator + ' ') + ')';
}
function generateEnum(ast, options) {
    return (ast.comment ? generateComment(ast.comment, options, 0) : '')
        + 'export ' + (options.enableConstEnums ? 'const ' : '') + `enum ${utils_1.toSafeString(ast.name)} {`
        + '\n'
        + ast.params.map(_ => options.indentWith
            + _.name
            + ' = '
            + generateType(_, options))
            .join(',\n')
        + '\n'
        + '}'
        + '\n';
}
function generateInterface(ast, options) {
    return (ast.comment ? generateComment(ast.comment, options, 0) : '')
        + `export interface ${utils_1.toSafeString(ast.name)} {`
        + '\n'
        + ast.params
            .map(_ => [_, generateType(_, options)])
            .map(([ast, type]) => (ast.comment ? generateComment(ast.comment, options, 1) : '')
            + options.indentWith
            + ast.name
            + (ast.isRequired ? '' : '?')
            + ': '
            + (ast.type === 'ENUM' || ast.type === 'INTERFACE' ? utils_1.toSafeString(type) : type)
            + (options.enableTrailingSemicolonForInterfaceProperties ? ';' : ''))
            .join('\n')
        + '\n'
        + '}'
        + (options.enableTrailingSemicolonForInterfaces ? ';' : '')
        + '\n';
}
function generateComment(comment, options, indentDepth) {
    return options.indentWith.repeat(indentDepth)
        + [
            '/**',
            ...comment.split('\n').map(_ => ' * ' + _),
            ' */'
        ].join('\n' + options.indentWith.repeat(indentDepth))
        + '\n';
}
//# sourceMappingURL=generator.js.map