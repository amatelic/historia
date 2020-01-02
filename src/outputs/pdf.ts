import { PDFArguments, PuppeterBaseConfig } from "../utils/types";
import * as puppeteer from 'puppeteer-core';

type PuppeterPromise = () => Promise<[puppeteer.Browser, puppeteer.Page]>;

export default class Pdf {

    private _config: PDFArguments;

    constructor(private path: string, private puppeterPromise: PuppeterPromise, private baseConfig: PuppeterBaseConfig) {
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

    getConfig(): PDFArguments {
        return this._config
    }

    async render(): Promise<any> {
        try {

            const [browser, page] = await this.puppeterPromise();

            if (this.baseConfig._viewPort) {
                page.setViewport(this.baseConfig._viewPort);
            }

            const pdf = await page.pdf(Object.assign({}, this._config,
                { path: this.path, format: this.baseConfig._output as any, printBackground: true }
            ));
            
            await browser.close();

            return pdf;

        } catch (error) {
            throw error;
        }
    }
}