import { JSONSchema, Type } from './JSONSchema';
export declare type AST_TYPE = 'ANY' | 'ARRAY' | 'BOOLEAN' | 'ENUM' | 'INTERFACE' | 'INTERSECTION' | 'LITERAL' | 'NUMBER' | 'NULL' | 'OBJECT' | 'REFERENCE' | 'STRING' | 'TUPLE' | 'UNION';
export interface AST {
    comment?: string;
    name: string;
    isRequired: boolean;
    type: AST_TYPE;
}
export interface TArray extends AST {
    type: 'ARRAY';
    params: AST;
}
export interface TTuple extends AST {
    type: 'TUPLE';
    params: AST[];
}
export interface TInterface extends AST {
    type: 'INTERFACE';
    params: AST[];
    /**
     * Which ID should $refs reference?
     * eg. "/Users/boris/project/schema.json#"
     * eg. "/Users/boris/project/schema.json#foo/bar"
     */
    refId: string;
}
export interface TReference extends AST {
    type: 'REFERENCE';
    params: string;
}
export interface TAny extends AST {
    type: 'ANY';
}
export interface TEnum extends AST {
    type: 'ENUM';
    params: AST[];
}
export interface TLiteral extends AST {
    params: Type;
    type: 'LITERAL';
}
export interface TIntersection extends AST {
    type: 'INTERSECTION';
    params: AST[];
}
export interface TReference extends AST {
    type: 'REFERENCE';
    params: string;
}
export interface TUnion extends AST {
    type: 'UNION';
    params: AST[];
}
export declare function parse(schema: JSONSchema, name?: string, rootSchema?: JSONSchema, isRequired?: boolean): AST;
