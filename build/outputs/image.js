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
const path = require("path");
class Image {
    constructor(pathFile, puppeterPromise, baseConfig) {
        this.pathFile = pathFile;
        this.puppeterPromise = puppeterPromise;
        this.baseConfig = baseConfig;
        this.fullPage = false;
    }
    fileExtensionGuard(pathFile) {
        const fileObj = path.parse(pathFile);
        const ext = fileObj.ext.slice(1);
        if (ext === types_1.PuppeteerImageTypes.JPEG || ext === types_1.PuppeteerImageTypes.PNG) {
            return ext;
        }
        throw new Error(`File type: ${fileObj.ext} not supported`);
    }
    setFullPage() {
        this.fullPage = true;
        return this;
    }
    generate() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ext = this.fileExtensionGuard(this.pathFile);
                const [browser, page] = yield this.puppeterPromise();
                if (!!this.baseConfig._viewPort) {
                    page.setViewport(this.baseConfig._viewPort);
                }
                const screenshot = yield page.screenshot({
                    path: this.pathFile,
                    type: ext,
                    fullPage: this.fullPage
                });
                yield browser.close();
                return screenshot;
            }
            catch (error) {
                throw error;
            }
        });
    }
    clip(x, y, width, height) {
        return __awaiter(this, void 0, void 0, function* () {
            const ext = this.fileExtensionGuard(this.pathFile);
            const [browser, page] = yield this.puppeterPromise();
            if (this.baseConfig._viewPort) {
                page.setViewport(this.baseConfig._viewPort);
            }
            const screenshot = yield page.screenshot({
                path: this.pathFile,
                type: ext,
                clip: {
                    x, y, width, height
                }
            });
            yield browser.close();
            return screenshot;
        });
    }
}
exports.default = Image;
//# sourceMappingURL=image.js.map