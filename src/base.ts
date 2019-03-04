import { HistoriaArgs } from "./index";
import * as puppeteer from 'puppeteer';
import Pdf from './pdf';
import { Viewport, waitUntil, imageTypes } from "./types";

export interface PuppeterBaseConfig {
    _viewPort?: Viewport;
    _waitUntil: waitUntil;
    _output: string ;  
}

export default class PuppeterBase {
    protected config: PuppeterBaseConfig 

    constructor(protected puppeterConfig: HistoriaArgs = {}) {
        this.config = {
            _waitUntil: 'load',
            _output: 'A4',  
        };
    }

    protected async generatePage(): Promise<[puppeteer.Browser, puppeteer.Page]> {
        try {
            const browser = await puppeteer.launch(this.puppeterConfig);
            const page = await browser.newPage();
            return [browser, page];
        } catch (error) {
            throw error;
        }
    }

    public getConfig(): any {
        return {
            viewPort: this.config._viewPort,
            waitUntil: this.config._waitUntil,
            output: this.config._output
        };
    }

    public hasViewPort(): Boolean {
        return !!this.config._viewPort;
    }


    waitUntil(waitUntil: waitUntil): PuppeterBase {
        this.config._waitUntil = waitUntil;
        return this;
    }

    setViewPort(width: number, height: number): PuppeterBase {
        
        this.config._viewPort = {
            width, height
        };

        return this;
    }

    setOutputView(format: string): PuppeterBase {
        this.config._output = format;
        return this;
    }


    pdf(path: string): Pdf {

        const baseConfig = Object.assign({}, this.config);
        const instance = () => this.generatePage();

        const pdf = new Pdf(path, instance, baseConfig);
                
        return pdf; 
    }

    async image(path: string, type: imageTypes = 'jpeg'): Promise<Buffer> {
        try {

            const [browser, page] = await this.generatePage();

            if (!!this.config._viewPort) {
                page.setViewport(this.config._viewPort);
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

            if (this.config._viewPort) {
                page.setViewport(this.config._viewPort);
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

