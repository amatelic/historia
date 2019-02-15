import { HistoriaArgs } from "./index";
import * as puppeteer from 'puppeteer';
import Pdf from './pdf';
import { Viewport, waitUntil, imageTypes } from "./types";

export default class PuppeterBase {
    protected _viewPort: Viewport;
    protected _waitUntil: waitUntil = 'load';
    protected _output: string = 'A4';

    constructor(protected config: HistoriaArgs) {}

    protected async generatePage(): Promise<[puppeteer.Browser, puppeteer.Page]> {
        try {
            const browser = await puppeteer.launch(this.config);
            const page = await browser.newPage();
            return [browser, page];
        } catch (error) {
            throw error;
        }
    }


    waitUntil(waitUntil: waitUntil): PuppeterBase {
        this._waitUntil = waitUntil;
        return this;
    }

    setViewPort(width: number, height: number): PuppeterBase {
        
        this._viewPort = {
            width, height
        };

        return this;
    }

    setOutputView(format: string): PuppeterBase {
        this._output = format;
        return this;
    }


    pdf(path: string): Pdf {
        const callback = async (config: any): Promise<any> => {
            try {

                const [browser, page] = await this.generatePage();

                if (this._viewPort) {
                    page.setViewport(this._viewPort);
                }

                const pdf = await page.pdf(Object.assign({}, config,
                    { path, format: this._output as any, printBackground: true }
                ));
                
                await browser.close();

                return pdf;

            } catch (error) {
                throw error;
            }
        }

        const pdf = new Pdf();
        
        pdf.render = pdf.render.bind(pdf, callback)
        
        return pdf; 
    }

    async image(path: string, type: imageTypes = 'jpeg'): Promise<Buffer> {
        try {

            const [browser, page] = await this.generatePage();

            if (this._viewPort) {
                page.setViewport(this._viewPort);
            }

            const screenshot = await page.screenshot({ path, type });
            await browser.close();

            return screenshot;

        } catch (error) {
            throw error;
        }
    }

    async clip(path: string, x: number, y: number, width: number, height: number, type: imageTypes = 'jpeg'): Promise<Buffer> {
        try {

            const [browser, page] = await this.generatePage();

            if (this._viewPort) {
                page.setViewport(this._viewPort);
            }

            const screenshot = await page.screenshot({ path, type, 
                clip: {
                    x, y, width, height
                } 
            });

            await browser.close();

            return screenshot;

        } catch (error) {
            throw error;
        }
    }

}

