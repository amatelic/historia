import * as puppeteer from 'puppeteer';
import Pdf from './outputs/pdf';
import Image from './outputs/image';
import { waitUntil, HistoriaArgs, PuppeterBaseConfig } from "./utils/types";
export default class PuppeterBase {
    protected puppeterConfig?: HistoriaArgs | undefined;
    protected config: PuppeterBaseConfig;
    constructor(puppeterConfig?: HistoriaArgs | undefined);
    protected generatePage(): Promise<[puppeteer.Browser, puppeteer.Page]>;
    getConfig(): any;
    hasViewPort(): Boolean;
    waitUntil(waitUntil: waitUntil): PuppeterBase;
    setViewPort(width: number, height: number): PuppeterBase;
    setOutputView(format: string): PuppeterBase;
    pdf(path: string): Pdf;
    image(pathFile: string): Image;
}
