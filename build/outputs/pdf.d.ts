import { PDFArguments, PuppeterBaseConfig } from "../utils/types";
import * as puppeteer from 'puppeteer';
declare type PuppeterPromise = () => Promise<[puppeteer.Browser, puppeteer.Page]>;
export default class Pdf {
    private path;
    private puppeterPromise;
    private baseConfig;
    private _config;
    constructor(path: string, puppeterPromise: PuppeterPromise, baseConfig: PuppeterBaseConfig);
    setMargin(top: number, right: number, bottom: number, left: number): Pdf;
    setToLandScape(): Pdf;
    header(template: string): Pdf;
    footer(template: string): Pdf;
    getConfig(): PDFArguments;
    render(): Promise<any>;
}
export {};
