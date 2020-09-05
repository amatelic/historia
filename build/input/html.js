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
class PuppeterHTML extends base_1.default {
    constructor(puppeterConfig, htmlTemplate) {
        super(puppeterConfig);
        this.puppeterConfig = puppeterConfig;
        this.htmlTemplate = htmlTemplate;
    }
    generatePage() {
        const _super = Object.create(null, {
            generatePage: { get: () => super.generatePage }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const [browser, page] = yield _super.generatePage.call(this);
            yield page.setContent(this.htmlTemplate);
            return [browser, page];
        });
    }
    download(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const [browser, page] = yield this.generatePage();
            yield page.goto(url);
            let bodyHTML = yield page.evaluate(() => document.body.innerHTML);
            yield browser.close();
            return bodyHTML;
        });
    }
}
exports.default = PuppeterHTML;
//# sourceMappingURL=html.js.map