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

export interface Viewport {
    width: number,
    height: number,
}

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