import * as puppeteer from 'puppeteer-core';
export declare class PuppeteerFormats {
    static LETTER: string;
    static LEGAL: string;
    static TABLOID: string;
    static LEDGER: string;
    static A0: string;
    static A1: string;
    static A2: string;
    static A3: string;
    static A4: string;
    static A5: string;
    static A6: string;
}
export declare class PuppeteerImageTypes {
    static JPEG: string;
    static PNG: string;
}
export declare type imageTypes = 'jpeg' | 'png';
export declare type waitUntil = 'load' | 'domcontentloaded' | 'networkidle0' | 'networkidle2';
export declare type Viewport = {
    width: number;
    height: number;
} | undefined;
export interface PDFArguments {
    path?: string;
    printBackground?: boolean;
    margin?: {
        top: number;
        right: number;
        bottom: number;
        left: number;
    };
    headerTemplate?: string;
    footerTemplate?: string;
    landscape?: boolean;
    displayHeaderFooter?: boolean;
}
export interface HistoriaArgs {
    slowMO?: number;
    devtools?: boolean;
    args?: string[];
    headless: boolean;
    executablePath: string;
    meta?: {
        lazy: boolean;
        timeout: number;
    };
}
export interface PuppeterBaseConfig {
    _viewPort?: Viewport;
    _waitUntil: waitUntil;
    _output: string;
}
export declare type PuppeterPromise = () => Promise<[puppeteer.Browser, puppeteer.Page]>;
export declare const pdfDefault: {
    path: string;
    printBackground: boolean;
    margin: {
        top: number;
        right: number;
        bottom: number;
        left: number;
    };
    headerTemplate: string;
    footerTemplate: string;
    landscape: boolean;
    displayHeaderFooter: boolean;
};
