import { HistoriaArgs } from "../utils/types";
import * as puppeteer from 'puppeteer';
import PuppeterBase from "../base";
export default class PuppeterHTML extends PuppeterBase {
    protected puppeterConfig: HistoriaArgs;
    private htmlTemplate;
    constructor(puppeterConfig: HistoriaArgs, htmlTemplate: string);
    protected generatePage(): Promise<[puppeteer.Browser, puppeteer.Page]>;
    download(url: string): Promise<any>;
}
