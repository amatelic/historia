import { HistoriaArgs } from "./index";
import * as puppeteer from 'puppeteer-core';
import Pdf from './outputs/pdf';
import Image from './outputs/image';

import { Viewport, waitUntil, imageTypes} from "./types";

export interface PuppeterBaseConfig {
    _viewPort?: Viewport;
    _waitUntil: waitUntil;
    _output: string ;  
}

export default class PuppeterBase {
    protected config: PuppeterBaseConfig 

    constructor(protected puppeterConfig?: HistoriaArgs) {
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


    pdf(path: string, format: string): Pdf {

        const baseConfig = Object.assign({}, this.config);
        const instance = () => this.generatePage();

        const pdf = new Pdf(path, instance, baseConfig);
                
        return pdf; 
    }

    image(pathFile: string): Image {

        const baseConfig = Object.assign({}, this.config);
        const instance = () => this.generatePage();

        return new Image(pathFile, instance, baseConfig);                
    }

}

