/// <reference types="node" />
import { PuppeterBaseConfig, PuppeterPromise } from "../utils/types";
export default class Image {
    private pathFile;
    private puppeterPromise;
    private baseConfig;
    private fullPage;
    constructor(pathFile: string, puppeterPromise: PuppeterPromise, baseConfig: PuppeterBaseConfig);
    private fileExtensionGuard;
    setFullPage(): this;
    generate(): Promise<Buffer>;
    clip(x: number, y: number, width: number, height: number): Promise<Buffer>;
}
