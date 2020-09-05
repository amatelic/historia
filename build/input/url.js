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
const base_1 = require("../base");
const html_1 = require("../outputs/html");
const url = require("url");
class PuppeterURL extends base_1.default {
    constructor(puppeterConfig, url) {
        super(puppeterConfig);
        this.puppeterConfig = puppeterConfig;
        this.url = url;
    }
    generatePage() {
        const _super = Object.create(null, {
            generatePage: { get: () => super.generatePage }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const [browser, page] = yield _super.generatePage.call(this);
            yield page.goto(this.url, { waitUntil: this.config._waitUntil });
            return [browser, page];
        });
    }
    download() {
        return __awaiter(this, void 0, void 0, function* () {
            const [browser, page] = yield this.generatePage();
            let bodyHTML = yield page.evaluate(() => document.body.innerHTML);
            yield browser.close();
            return bodyHTML;
        });
    }
    html() {
        const instance = () => this.generatePage();
        const { hostname } = url.parse(this.url);
        if (!hostname) {
            throw new Error('Hostname not provided');
        }
        return new html_1.default(hostname, instance);
    }
}
exports.default = PuppeterURL;
//# sourceMappingURL=url.js.map