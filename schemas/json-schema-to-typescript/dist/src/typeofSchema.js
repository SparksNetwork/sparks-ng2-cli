"use strict";
const lodash_1 = require('lodash');
/**
 * Duck types a JSONSchema schema or property to determine which kind of AST node to parse it into.
 */
function typeOfSchema(schema) {
    if (!lodash_1.isPlainObject(schema))
        return 'LITERAL';
    if (schema.allOf)
        return 'ALL_OF';
    if (schema.anyOf)
        return 'ANY_OF';
    if (schema.items)
        return 'TYPED_ARRAY';
    if (schema.enum && schema.tsEnumNames)
        return 'NAMED_ENUM';
    if (schema.enum)
        return 'UNNAMED_ENUM';
    if (schema.properties || schema.additionalProperties)
        return 'NAMED_SCHEMA';
    if (schema.$ref)
        return 'REFERENCE';
    if (Array.isArray(schema.type))
        return 'UNION';
    switch (schema.type) {
        case 'string': return 'STRING';
        case 'number': return 'NUMBER';
        case 'integer': return 'NUMBER';
        case 'boolean': return 'BOOLEAN';
        case 'object': return 'OBJECT'; // TODO: is this ok?
        case 'array': return 'UNTYPED_ARRAY';
        case 'null': return 'NULL';
        case 'any': return 'ANY';
    }
    if (lodash_1.isPlainObject(schema))
        return 'UNNAMED_SCHEMA';
    return 'ANY';
}
exports.typeOfSchema = typeOfSchema;
//# sourceMappingURL=typeofSchema.js.map