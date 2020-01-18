import { HistoriaArgs } from "../utils/types";
import * as puppeteer from 'puppeteer';
import PuppeterBase from "../base";

export default class PuppeterHTML extends PuppeterBase {
    constructor(protected puppeterConfig: HistoriaArgs, private htmlTemplate: string) {
        super(puppeterConfig);
    }

    protected async generatePage(): Promise<[puppeteer.Browser, puppeteer.Page]> {
        const [ browser, page ] = await super.generatePage();
        await page.setContent(this.htmlTemplate, { waitUntil: this.config._waitUntil });
        return [browser, page];     
    }

    async download(url: string): Promise<any> {
        const [browser, page] = await this.generatePage();
        await page.goto(url);

        let bodyHTML = await page.evaluate(() => document.body.innerHTML);

        await browser.close();
        return bodyHTML;
    }
}