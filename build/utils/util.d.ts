export declare const delay: (timeout: number) => Promise<{}>;
export declare function writeFileSyncRecursive(filename: string, content: string, charset?: string): void;
export declare const go: <T>(promise: Promise<T>) => Promise<any[] | (T | null)[]>;
