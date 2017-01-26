"use strict";
const lodash_1 = require('lodash');
const COMMENT_START = '/**';
const COMMENT_INDENT = ' * ';
const COMMENT_END = ' */';
const INDENT_STRING = '  ';
class TsType {
    constructor(value) {
        this.value = value;
    }
    safeId() {
        return nameToTsSafeName(this.id);
    }
    toBlockComment() {
        return this.description && !this.isSimpleType()
            ? `${generateComment(this.description).join('\n')}\n`
            : '';
    }
    isSimpleType() { return true; }
    toDeclaration(settings) {
        return this.toBlockComment()
            + `export type ${this.safeId()} = ${this.toString(settings)}`
            + (settings.endTypeWithSemicolon ? ';' : '');
    }
    toType(settings) {
        return this.safeId() || this.toString(settings);
    }
}
exports.TsType = TsType;
class Any extends TsType {
    constructor() {
        super(undefined);
    }
    toString() {
        return 'any';
    }
}
exports.Any = Any;
class String extends TsType {
    constructor() {
        super(undefined);
    }
    toString() {
        return 'string';
    }
}
exports.String = String;
class Boolean extends TsType {
    constructor() {
        super(undefined);
    }
    toString() {
        return 'boolean';
    }
}
exports.Boolean = Boolean;
class Number extends TsType {
    constructor() {
        super(undefined);
    }
    toString() {
        return 'number';
    }
}
exports.Number = Number;
class Object extends TsType {
    constructor() {
        super(undefined);
    }
    toString() {
        return 'Object';
    }
}
exports.Object = Object;
class Null extends TsType {
    constructor() {
        super(undefined);
    }
    toString() {
        return 'null';
    }
}
exports.Null = Null;
class Literal extends TsType {
    toString() {
        return JSON.stringify(this.value);
    }
}
exports.Literal = Literal;
class Reference extends TsType {
    toString() { return this.value; }
}
exports.Reference = Reference;
class EnumValue extends TsType {
    constructor([identifier, value]) {
        super(value);
        this.identifier = identifier;
    }
    toDeclaration() {
        // if there is a value associated with the identifier, declare as identifier=value
        // else declare as identifier
        return `${this.identifier}${this.value ? (' = ' + this.value) : ''}`;
    }
    toString() {
        return `Enum${this.identifier}`;
    }
}
exports.EnumValue = EnumValue;
class Enum extends TsType {
    constructor(id, value) {
        super(value);
        this.id = id;
    }
    isSimpleType() { return false; }
    toString(settings) {
        return this.safeId();
    }
    toDeclaration(settings) {
        return this.toBlockComment()
            + `export ${settings.useConstEnums ? 'const ' : ''}enum ${this.safeId()} {`
            + '\n'
            + INDENT_STRING
            + this.value.map(_ => _.toDeclaration()).join(`,\n${INDENT_STRING}`)
            + '\n'
            + '}';
    }
}
exports.Enum = Enum;
class Array extends TsType {
    constructor(value = new Any) {
        super(value);
    }
    toString(settings) {
        const type = this.value.toType(settings);
        return `${type.indexOf('|') > -1 || type.indexOf('&') > -1 ? `(${type})` : type}[]`; // hacky
    }
}
exports.Array = Array;
class Intersection extends TsType {
    isSimpleType() { return this.value.length <= 1; }
    toString(settings) {
        return this.value
            .filter(_ => !(_ instanceof Null))
            .map(_ => _.toType(settings))
            .join(' & ');
    }
}
exports.Intersection = Intersection;
class Union extends TsType {
    isSimpleType() { return this.value.length <= 1; }
    toString(settings) {
        return this.value
            .map(_ => _.toType(settings))
            .join(' | ');
    }
}
exports.Union = Union;
class Interface extends TsType {
    static reference(id) {
        let ret = new Interface([]);
        ret.id = id;
        return ret;
    }
    toString(settings) {
        return `{\n`
            + `${this.value.map(_ => `${INDENT_STRING}${_.type.description
                ? generateComment(_.type.description).join(`\n${INDENT_STRING}`) + `\n${INDENT_STRING}`
                : ''}${_.name}${_.required ? '' : '?'}: ${_.type.toType(settings).replace(/\n/g, '\n' + INDENT_STRING) // ghetto nested indents
            }${settings.endPropertyWithSemicolon ? ';' : ''}`).join('\n')}
}`;
    }
    isSimpleType() { return false; }
    toDeclaration(settings) {
        return `${this.toBlockComment()}export interface ${this.safeId()} ${this.toString(settings)}`;
    }
}
exports.Interface = Interface;
// eg.
//   foo -> Foo
//   fooBar -> FooBar
//   foo_1bar -> Foo_1bar
// TODO: more safety
// TODO: unit tests
function nameToTsSafeName(name) {
    return lodash_1.upperFirst(lodash_1.camelCase(name));
}
function generateComment(string) {
    return [
        COMMENT_START,
        ...string.split('\n').map(_ => COMMENT_INDENT + _),
        COMMENT_END
    ];
}
//# sourceMappingURL=_TsTypes.js.map