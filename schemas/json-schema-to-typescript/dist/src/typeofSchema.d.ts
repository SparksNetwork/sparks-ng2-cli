import { JSONSchema } from './JSONSchema';
export declare type SCHEMA_TYPE = 'ALL_OF' | 'UNNAMED_SCHEMA' | 'ANY' | 'ANY_OF' | 'BOOLEAN' | 'LITERAL' | 'NAMED_ENUM' | 'NAMED_SCHEMA' | 'NULL' | 'NUMBER' | 'STRING' | 'OBJECT' | 'TYPED_ARRAY' | 'REFERENCE' | 'UNION' | 'UNNAMED_ENUM' | 'UNTYPED_ARRAY';
/**
 * Duck types a JSONSchema schema or property to determine which kind of AST node to parse it into.
 */
export declare function typeOfSchema(schema: JSONSchema): SCHEMA_TYPE;
