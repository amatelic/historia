import { HistoriaArgs } from "../utils/types";
import * as puppeteer from 'puppeteer';
import PuppeterBase from "../base";
import Html from "../outputs/html";
export default class PuppeterURL extends PuppeterBase {
    protected puppeterConfig: HistoriaArgs;
    private url;
    constructor(puppeterConfig: HistoriaArgs, url: string);
    protected generatePage(): Promise<[puppeteer.Browser, puppeteer.Page]>;
    download(): Promise<any>;
    html(): Html;
}
