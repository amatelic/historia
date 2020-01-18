import * as puppeteer from 'puppeteer-core';

export class PuppeteerFormats {
    static LETTER = 'Letter';
    static LEGAL = 'Legal';
    static TABLOID = 'Tabloid';
    static LEDGER = 'Ledger';
    static A0 = 'A0';
    static A1 = 'A1';
    static A2 = 'A2';
    static A3 = 'A3';
    static A4 = 'A4';
    static A5 = 'A5';
    static A6 = 'A6';
}

export class PuppeteerImageTypes {
    static JPEG = 'jpeg';
    static PNG  = 'png';
}

export type imageTypes =  'jpeg' | 'png';

export type waitUntil = 'load' | 'domcontentloaded' | 'networkidle0' | 'networkidle2';

export type Viewport = {
    width: number,
    height: number,
} | undefined;

export interface PDFArguments {
    path?: string;
    printBackground? : boolean;
    margin?: {
        top: number,
        right: number,
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
    executablePath: string,
    meta?: {
        lazy: boolean;
        timeout: number, 
    }
}

export interface PuppeterBaseConfig {
    _viewPort?: Viewport;
    _waitUntil: waitUntil;
    _output: string ;  
}



export type PuppeterPromise = () => Promise<[puppeteer.Browser, puppeteer.Page]>;

export const pdfDefault = {
    path: '',
    printBackground: true,
    margin: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    },
    headerTemplate: '',
    footerTemplate: '',
    landscape: false,
    displayHeaderFooter: false,
}