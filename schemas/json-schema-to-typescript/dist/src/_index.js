"use strict";
const TsType = require('./TsTypes');
const fs_1 = require('fs');
const lodash_1 = require('lodash');
const path_1 = require('path');
var RuleType;
(function (RuleType) {
    RuleType[RuleType["Any"] = 0] = "Any";
    RuleType[RuleType["TypedArray"] = 1] = "TypedArray";
    RuleType[RuleType["Enum"] = 2] = "Enum";
    RuleType[RuleType["AllOf"] = 3] = "AllOf";
    RuleType[RuleType["AnyOf"] = 4] = "AnyOf";
    RuleType[RuleType["Reference"] = 5] = "Reference";
    RuleType[RuleType["NamedSchema"] = 6] = "NamedSchema";
    RuleType[RuleType["AnonymousSchema"] = 7] = "AnonymousSchema";
    RuleType[RuleType["String"] = 8] = "String";
    RuleType[RuleType["Number"] = 9] = "Number";
    RuleType[RuleType["Null"] = 10] = "Null";
    RuleType[RuleType["Object"] = 11] = "Object";
    RuleType[RuleType["Array"] = 12] = "Array";
    RuleType[RuleType["Boolean"] = 13] = "Boolean";
    RuleType[RuleType["Literal"] = 14] = "Literal";
    RuleType[RuleType["NamedEnum"] = 15] = "NamedEnum";
    RuleType[RuleType["Union"] = 16] = "Union";
})(RuleType || (RuleType = {}));
var EnumType;
(function (EnumType) {
    EnumType[EnumType["Boolean"] = 0] = "Boolean";
    EnumType[EnumType["Number"] = 1] = "Number";
    EnumType[EnumType["String"] = 2] = "String";
})(EnumType || (EnumType = {}));
class Compiler {
    constructor(schema, filePath = '', settings) {
        this.schema = schema;
        this.filePath = path_1.parse(path_1.resolve(filePath));
        this.declarations = new Map;
        this.namedEnums = new Map;
        this.id = schema.id || schema.title || this.filePath.name || 'Interface1';
        this.settings = Object.assign({}, Compiler.DEFAULT_SETTINGS, settings);
        this.declareType(this.toTsType(this.schema, '', true), this.id, this.id);
    }
    toString() {
        return [
            ...Array.from(this.namedEnums.values()),
            ...Array.from(this.declarations.values())
        ]
            .map(_ => _.toDeclaration(this.settings))
            .join('\n');
    }
    isRequired(propertyName, schema) {
        return schema.required ? schema.required.indexOf(propertyName) > -1 : false;
    }
    supportsAdditionalProperties(schema) {
        return schema.additionalProperties === true || lodash_1.isPlainObject(schema.additionalProperties);
    }
    getRuleType(rule) {
        // normalize rule
        // TODO: move this somewhere else
        // TODO: avoid mutating rule
        if (rule.type && Array.isArray(rule.type) && rule.type.length === 1) {
            rule.type = rule.type[0];
        }
        if (rule.type === 'array' && rule.items) {
            return RuleType.TypedArray;
        }
        if (rule.enum && rule.tsEnumNames) {
            return RuleType.NamedEnum;
        }
        if (rule.enum) {
            return RuleType.Enum;
        }
        if (rule.properties || rule.additionalProperties) {
            return RuleType.NamedSchema;
        }
        if (rule.allOf) {
            return RuleType.AllOf;
        }
        if (rule.anyOf) {
            return RuleType.AnyOf;
        }
        if (rule.$ref) {
            return RuleType.Reference;
        }
        switch (rule.type) {
            case 'array': return RuleType.Array;
            case 'boolean': return RuleType.Boolean;
            case 'integer':
            case 'number': return RuleType.Number;
            case 'null': return RuleType.Null;
            case 'object': return RuleType.Object;
            case 'string': return RuleType.String;
        }
        if (Array.isArray(rule.type)) {
            return RuleType.Union;
        }
        if (this.isNumberLiteral(rule)) {
            return RuleType.Number;
        }
        if (!lodash_1.isPlainObject(rule)) {
            return RuleType.Literal;
        }
        if (lodash_1.isPlainObject(rule)) {
            return RuleType.AnonymousSchema; // TODO: is it safe to do this as a catchall?
        }
        return RuleType.Any;
    }
    isNumberLiteral(a) {
        return /^[\d\.]+$/.test(a);
    }
    resolveRefFromLocalFS(refPath, propName) {
        const fullPath = path_1.resolve(path_1.join(this.filePath.dir, refPath));
        if (fullPath.startsWith('http')) {
            throw new ReferenceError('Remote http references are not yet supported.  Could not read ' + fullPath);
        }
        const file = tryFn(() => fs_1.readFileSync(fullPath), () => { throw new ReferenceError(`Unable to find referenced file "${fullPath}"`); });
        const contents = tryFn(() => JSON.parse(file.toString()), () => { throw new TypeError(`Referenced local schema "${fullPath}" contains malformed JSON`); });
        const targetType = this.toTsType(contents, propName, true);
        const id = targetType.id
            ? targetType.toType(this.settings)
            : path_1.parse(fullPath).name;
        if (this.settings.declareReferenced) {
            this.declareType(targetType, id, id);
        }
        return new TsType.Reference(id);
    }
    // eg. "#/definitions/diskDevice" => ["definitions", "diskDevice"]
    // only called in case of a $ref type
    resolveRef(refPath, propName) {
        if (refPath === '#' || refPath === '#/') {
            return TsType.Interface.reference(this.id);
        }
        if (refPath[0] !== '#') {
            return this.resolveRefFromLocalFS(refPath, propName);
        }
        const parts = refPath.slice(2).split('/');
        const existingRef = this.declarations.get(parts.join('/'));
        // resolve existing declaration?
        if (existingRef) {
            return existingRef;
        }
        // resolve from elsewhere in the schema
        const type = this.toTsType(lodash_1.get(this.schema, parts.join('.')));
        if (this.settings.declareReferenced || !type.isSimpleType()) {
            this.declareType(type, parts.join('/'), this.settings.useFullReferencePathAsName ? parts.join('/') : lodash_1.last(parts));
        }
        return type;
    }
    declareType(type, refPath, id) {
        type.id = id;
        this.declarations.set(refPath, type);
        return type;
    }
    generateEnumName(rule, propName) {
        return rule.id || propName || `Enum${this.namedEnums.size}`;
    }
    generateTsType(rule, propName, isReference = false) {
        switch (this.getRuleType(rule)) {
            case RuleType.AnonymousSchema:
            case RuleType.NamedSchema:
                return this.toTsDeclaration(rule);
            case RuleType.Enum:
                return new TsType.Union(rule.enum.map(_ => new TsType.Literal(_)));
            case RuleType.NamedEnum:
                Compiler.validateNamedEnum(rule);
                const name = this.generateEnumName(rule, propName);
                const tsEnum = new TsType.Enum(name, lodash_1.zip(rule.tsEnumNames, rule.enum).map(_ => new TsType.EnumValue(_)));
                this.namedEnums.set(name, tsEnum);
                return tsEnum;
            case RuleType.Any: return new TsType.Any;
            case RuleType.Literal: return new TsType.Literal(rule);
            case RuleType.TypedArray: return new TsType.Array(this.toTsType(rule.items));
            case RuleType.Array: return new TsType.Array;
            case RuleType.Boolean: return new TsType.Boolean;
            case RuleType.Null: return new TsType.Null;
            case RuleType.Number: return new TsType.Number;
            case RuleType.Object: return new TsType.Object;
            case RuleType.String: return new TsType.String;
            case RuleType.AllOf:
                return new TsType.Intersection(rule.allOf.map(_ => this.toTsType(_)));
            case RuleType.AnyOf:
                return new TsType.Union(rule.anyOf.map(_ => this.toTsType(_)));
            case RuleType.Reference:
                return this.resolveRef(rule.$ref, propName);
            case RuleType.Union:
                return new TsType.Union(rule.type.map(_ => this.toTsType({ type: _ })));
        }
        throw new Error('Unknown rule:' + rule.toString());
    }
    static validateNamedEnum(rule) {
        if (rule.tsEnumNames.length !== rule.enum.length) {
            throw new TypeError(`Property enum and property tsEnumNames must be the same length: ${JSON.stringify(rule)}`);
        }
        if (rule.tsEnumNames.some(_ => typeof _ !== 'string')) {
            throw TypeError('If tsEnumValue is declared, it must be an array of strings');
        }
    }
    toTsType(rule, propName, isReference = false) {
        const type = this.generateTsType(rule, propName, isReference);
        if (!type.id) {
            // the type is not declared, let's check if we should declare it or keep it inline
            type.id = rule.id || rule.title; // TODO: fix types
            if (type.id && !isReference)
                this.declareType(type, type.id, type.id);
        }
        type.description = type.description || rule.description;
        return type;
    }
    toTsDeclaration(schema) {
        const copy = lodash_1.merge({}, Compiler.DEFAULT_SCHEMA, schema);
        const props = lodash_1.map(copy.properties, (v, k) => {
            return {
                name: k,
                required: this.isRequired(k, copy),
                type: this.toTsType(v, k)
            };
        });
        if (props.length === 0 && !('additionalProperties' in schema)) {
            if ('default' in schema)
                return new TsType.Null;
        }
        if (this.supportsAdditionalProperties(copy)) {
            const short = copy.additionalProperties === true;
            if (short && props.length === 0)
                return new TsType.Any;
            const type = short ? new TsType.Any : this.toTsType(copy.additionalProperties);
            props.push({
                name: '[k: string]',
                required: true,
                type
            }); // TODO: fix type
        }
        return new TsType.Interface(props);
    }
}
Compiler.DEFAULT_SETTINGS = {
    declareReferenced: true,
    endPropertyWithSemicolon: true,
    endTypeWithSemicolon: true,
    useConstEnums: true,
    useFullReferencePathAsName: false
};
Compiler.DEFAULT_SCHEMA = {
    additionalProperties: true,
    properties: {},
    required: [],
    type: 'object'
};
function compile(schema, path, settings) {
    return new Compiler(schema, path, settings).toString();
}
exports.compile = compile;
function compileFromFile(inputFilename) {
    return new Promise((resolve, reject) => fs_1.readFile(inputFilename, (err, data) => {
        if (err) {
            reject(err);
        }
        else {
            resolve(compile(JSON.parse(data.toString()), inputFilename));
        }
    }));
}
exports.compileFromFile = compileFromFile;
// TODO: pull out into a separate package
function tryFn(fn, err) {
    try {
        return fn();
    }
    catch (e) {
        return err(e);
    }
}
//# sourceMappingURL=_index.js.map