import {  PuppeteerImageTypes, PuppeterBaseConfig, PuppeterPromise } from "../utils/types";
import * as path from 'path';


export default class Image {
    private fullPage = false;

    constructor(private pathFile: string, private puppeterPromise: PuppeterPromise, private baseConfig: PuppeterBaseConfig) { }

    private fileExtensionGuard(pathFile: string): string {
        const fileObj = path.parse(pathFile);
        const ext = fileObj.ext.slice(1);
        if (ext === PuppeteerImageTypes.JPEG || ext === PuppeteerImageTypes.PNG) {
            return ext;
        } 
        throw new Error(`File type: ${fileObj.ext} not supported`);
    }


    setFullPage() {
        this.fullPage = true;
        return this;
    }

    async generate(): Promise<Buffer> {
        try {

            const ext = this.fileExtensionGuard(this.pathFile);

            const [browser, page] = await this.puppeterPromise();

            if (!!this.baseConfig._viewPort) {
                page.setViewport(this.baseConfig._viewPort);
            }

            const screenshot = await page.screenshot({ 
                path: this.pathFile, 
                type: ext as any, 
                fullPage: this.fullPage
            });
            await browser.close();

            return screenshot;

        } catch (error) {
            throw error;
        }
    }



    async clip(x: number, y: number, width: number, height: number): Promise<Buffer> {
        const ext = this.fileExtensionGuard(this.pathFile);

        const [browser, page] = await this.puppeterPromise();

        if (this.baseConfig._viewPort) {
            page.setViewport(this.baseConfig._viewPort);
        }

        const screenshot = await page.screenshot({ 
            path: this.pathFile, 
            type: ext as any, 
            clip: {
                x, y, width, height
            } 
        });

        await browser.close();

        return screenshot;
    }
}