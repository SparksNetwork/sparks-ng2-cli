export declare function Try<T>(fn: () => T, err: (e: Error) => any): T;
/**
 * Depth-first traversal
 */
export declare function dft<T, U>(object: {
    [k: string]: any;
}, cb: (value: U, key: string) => T): void;
/**
 * Avoid appending "Js" to top-level unnamed schemas
 */
export declare function stripExtension(filename: string): string;
/**
 * Convert a string that might contain spaces or special characters to one that
 * can safely be used as a TypeScript interface or enum name
 */
export declare function toSafeString(string: string): string;
