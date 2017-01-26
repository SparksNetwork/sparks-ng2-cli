/// <reference types="node" />
import { JSONSchema } from './JSONSchema';
export interface Options {
    enableConstEnums: boolean;
    enableTrailingSemicolonForTypes: boolean;
    enableTrailingSemicolonForEnums: boolean;
    enableTrailingSemicolonForInterfaceProperties: boolean;
    enableTrailingSemicolonForInterfaces: boolean;
    indentWith: string;
}
export declare const DEFAULT_OPTIONS: Options;
export declare function compileFromFile(filename: string, options?: Options): string | NodeJS.ErrnoException;
export declare function compile(schema: JSONSchema, name: string, options?: Options): string | NodeJS.ErrnoException;
