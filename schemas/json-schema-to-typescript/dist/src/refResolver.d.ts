import { JSONSchema } from './JSONSchema';
/**
 * Crawls a JSONSchema's $refs, and returns a list of all
 * referenced schemas
 */
export declare function collectRefs(schema: JSONSchema): {
    [schemaId: string]: JSONSchema;
};
export declare function readSchema(filename: string): JSONSchema;
