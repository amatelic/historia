import { HistoriaArgs } from "../utils/types";
import * as puppeteer from 'puppeteer';
import PuppeterBase from "../base";
import Html from "../outputs/html";
import * as url from 'url';

export default class PuppeterURL extends PuppeterBase {
    constructor(protected puppeterConfig: HistoriaArgs, private url: string) {
        super(puppeterConfig);
    }

    protected async generatePage(): Promise<[puppeteer.Browser, puppeteer.Page]> {
        try {
            const [ browser, page ] = await super.generatePage();
            await page.goto(this.url, { waitUntil: this.config._waitUntil });
            return [browser, page];     
        } catch (error) {
            throw error;
        }
    }

    async download(): Promise<any> {
        try {
            const [browser, page] = await this.generatePage();
            
            let bodyHTML = await page.evaluate(() => document.body.innerHTML);

            await browser.close();
            return bodyHTML;

        } catch (error) {
            throw error;
        }
    }

    html(): Html {
        const instance = () => this.generatePage();
        const { hostname } = url.parse(this.url);

        if (!hostname) {
            throw new Error('Hostname name not provided');
        }

        return new Html(hostname, instance);      
    }
}