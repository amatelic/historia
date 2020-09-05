"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// import * as puppeteer from 'puppeteer-core';
const puppeteer = require("puppeteer");
const pdf_1 = require("./outputs/pdf");
const image_1 = require("./outputs/image");
class PuppeterBase {
    constructor(puppeterConfig) {
        this.puppeterConfig = puppeterConfig;
        this.config = {
            _waitUntil: ['load', 'networkidle2'],
            _output: 'A4',
        };
    }
    generatePage() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const browser = yield puppeteer.launch(
                // this.puppeterConfig 
                {
                    args: [
                        '--no-sandbox',
                        '--disable-setuid-sandbox'
                    ],
                    headless: true,
                });
                const page = yield browser.newPage();
                return [browser, page];
            }
            catch (error) {
                throw error;
            }
        });
    }
    getConfig() {
        return {
            viewPort: this.config._viewPort,
            waitUntil: this.config._waitUntil,
            output: this.config._output
        };
    }
    hasViewPort() {
        return !!this.config._viewPort;
    }
    waitUntil(waitUntil) {
        this.config._waitUntil = waitUntil;
        return this;
    }
    setViewPort(width, height) {
        this.config._viewPort = {
            width, height
        };
        return this;
    }
    setOutputView(format) {
        this.config._output = format;
        return this;
    }
    pdf(path) {
        const baseConfig = Object.assign({}, this.config);
        const instance = () => this.generatePage();
        const pdf = new pdf_1.default(path, instance, baseConfig);
        return pdf;
    }
    image(pathFile) {
        const baseConfig = Object.assign({}, this.config);
        const instance = () => this.generatePage();
        return new image_1.default(pathFile, instance, baseConfig);
    }
}
exports.default = PuppeterBase;
//# sourceMappingURL=base.js.map