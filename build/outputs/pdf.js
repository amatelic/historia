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
const types_1 = require("../utils/types");
class Pdf {
    constructor(path, puppeterPromise, baseConfig) {
        this.path = path;
        this.puppeterPromise = puppeterPromise;
        this.baseConfig = baseConfig;
        this._config = Object.assign({}, types_1.pdfDefault);
    }
    setMargin(top, right, bottom, left) {
        this._config['margin'] = {
            top, right, bottom, left
        };
        return this;
    }
    setToLandScape() {
        this._config['landscape'] = true;
        return this;
    }
    header(template) {
        this._config['displayHeaderFooter'] = true;
        this._config['headerTemplate'] = template;
        return this;
    }
    footer(template) {
        this._config['displayHeaderFooter'] = true;
        this._config['footerTemplate'] = template;
        return this;
    }
    getConfig() {
        return this._config;
    }
    render() {
        return __awaiter(this, void 0, void 0, function* () {
            const [browser, page] = yield this.puppeterPromise();
            if (this.baseConfig._viewPort) {
                page.setViewport(this.baseConfig._viewPort);
            }
            yield page.waitFor(5000);
            // await page.emulateMediaType('print');
            const pdf = yield page.pdf(Object.assign({}, {
                path: this.path,
                format: 'A4',
                printBackground: true
            }));
            yield browser.close();
            return pdf;
        });
    }
}
exports.default = Pdf;
//# sourceMappingURL=pdf.js.map