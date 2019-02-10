import { HistoriaArgs } from "./index";
import * as puppeteer from 'puppeteer';
import PuppeterBase from "./base";

export default class PuppeterURL extends PuppeterBase {
    constructor(protected config: HistoriaArgs, private url: string) {
        super(config);
    }

    protected async generatePage(): Promise<[puppeteer.Browser, puppeteer.Page]> {
        try {
            const [ browser, page ] = await super.generatePage();
            await page.goto(this.url, { waitUntil: 'load' });
            return [browser, page];     
        } catch (error) {
            throw error;
        }
    }

    async download(url: string): Promise<any> {
        try {
            const [browser, page] = await this.generatePage();
            await page.goto(url);

            let bodyHTML = await page.evaluate(() => document.body.innerHTML);

            await browser.close();
            return bodyHTML;

        } catch (error) {
            throw error;
        }
    }
}