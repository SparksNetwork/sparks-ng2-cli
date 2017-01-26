"use strict";
const typeOfSchema_1 = require('./typeOfSchema');
const lodash_1 = require('lodash');
////////////////////////////////////////////     literals
const T_ANY = {
    isRequired: false,
    type: 'ANY'
};
const T_ANY_ADDITIONAL_PROPERTIES = { isRequired: true, name: '[k: string]', type: 'ANY' };
////////////////////////////////////////////     parser
function parse(schema, name, rootSchema = schema, isRequired = false) {
    switch (typeOfSchema_1.typeOfSchema(schema)) {
        case 'ALL_OF':
            // TODO: support schema.properties
            return { comment: schema.description, name, isRequired, params: schema.allOf.map(parse), type: 'INTERSECTION' };
        case 'ANY':
            return { comment: schema.description, name, isRequired, type: 'ANY' };
        case 'ANY_OF':
            return { comment: schema.description, name, isRequired, params: schema.anyOf.map(parse), type: 'UNION' };
        case 'BOOLEAN':
            return { comment: schema.description, name, isRequired, type: 'BOOLEAN' };
        case 'LITERAL':
            return { isRequired, name, params: schema, type: 'LITERAL' };
        case 'NAMED_ENUM':
            return { comment: schema.description, name, isRequired,
                params: schema.enum.map((_, n) => parse(_, schema.tsEnumNames[n], rootSchema)),
                type: 'ENUM'
            };
        case 'NAMED_SCHEMA':
            return { comment: schema.description, name: computeSchemaName(schema, name), isRequired, params: parseSchemaSchema(schema, rootSchema), type: 'INTERFACE' };
        case 'NULL':
            return { comment: schema.description, name, isRequired, type: 'NULL' };
        case 'NUMBER':
            return { comment: schema.description, name, isRequired, type: 'NUMBER' };
        case 'OBJECT':
            return { comment: schema.description, name, isRequired, type: 'OBJECT' };
        case 'REFERENCE':
            return parse(resolveReference(schema.$ref, rootSchema), '', schema);
        case 'STRING':
            return { comment: schema.description, name, isRequired, type: 'STRING' };
        case 'TYPED_ARRAY':
            if (Array.isArray(schema.items)) {
                return { comment: schema.description, name, isRequired, params: schema.items.map(parse), type: 'TUPLE' };
            }
            else {
                return { comment: schema.description, name, isRequired, params: parse(schema.items), type: 'ARRAY' };
            }
        case 'UNION':
            return { comment: schema.description, name, isRequired, params: schema.type.map(_ => parse({ type: _ })), type: 'UNION' };
        case 'UNNAMED_ENUM':
            return { comment: schema.description, name, isRequired, params: schema.enum.map(_ => parse(_)), type: 'UNION' };
        case 'UNNAMED_SCHEMA':
            return { comment: schema.description, name: 'Foo', isRequired, params: parseSchemaSchema(schema, rootSchema), type: 'INTERFACE' };
        case 'UNTYPED_ARRAY':
            return { comment: schema.description, name, isRequired, params: T_ANY, type: 'ARRAY' };
    }
}
exports.parse = parse;
/**
 * Compute a schema name using a series of fallbacks
 */
function computeSchemaName(schema, name // name from schema's filename
    ) {
    return schema.title || schema.id || name || 'Interface1'; // TODO: increment interface number
}
/**
 * Helper to parse schema properties into params on the parent schema's type
 */
function parseSchemaSchema(schema, rootSchema) {
    const asts = lodash_1.map(schema.properties, (value, key) => parse(value, key, rootSchema, schema.required.includes(key)));
    // handle additionalProperties
    switch (schema.additionalProperties) {
        case true: return asts.concat(T_ANY_ADDITIONAL_PROPERTIES);
        case false: return asts;
        // pass "true" as the last param because in TS, properties
        // defined via index signatures are already optional
        default: return asts.concat(parse(schema.additionalProperties, '[k: string]', rootSchema, true));
    }
}
function resolveReference($ref, rootSchema, definitions, context) {
    // if ($ref === '#') {
    //   return
    // }
}
function resolveExistingReference($ref, definitions) {
    // definitions.
}
//# sourceMappingURL=parser.js.map