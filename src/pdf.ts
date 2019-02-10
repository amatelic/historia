import * as puppeteer from 'puppeteer';

interface PDFArguments {
    path?: string;
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

export default class Pdf {

    private _config: PDFArguments;

    constructor() {
        this._config = {};
    }

    setMargin(top: number, right: number, bottom: number, left: number): Pdf {
        this._config['margin'] = {
            top, right, bottom, left
        };
        return this;
    }

    setToLandScape(): Pdf {
        this._config['landscape'] = true;
        return this;
    }

    header(template: string): Pdf {
        this._config['displayHeaderFooter'] = true;
        this._config['headerTemplate'] = template;
        return this;
    }

    footer(template: string): Pdf {
        this._config['displayHeaderFooter'] = true;
        this._config['footerTemplate'] = template;
        return this;
    }

    render(callback: (config: PDFArguments) => Promise<any>): Promise<any> {
        return callback(this._config);
    }
}