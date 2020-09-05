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
const url_1 = require("url");
const path = require("path");
const util_1 = require("../utils/util");
class Html {
    constructor(hostname, puppeterPromise) {
        this.hostname = hostname;
        this.puppeterPromise = puppeterPromise;
    }
    download() {
        return __awaiter(this, void 0, void 0, function* () {
            const [browser, page] = yield this.puppeterPromise();
            const responses = [];
            page.on('response', resp => {
                console.log(responses);
                responses.push(resp);
            });
            page.on('load', () => __awaiter(this, void 0, void 0, function* () {
                for (const resp of responses) {
                    const [requestErr, request] = yield util_1.go(resp.request());
                    if (requestErr)
                        throw new Error('Problems fetching request');
                    const url = new url_1.URL(request.url);
                    const split = url.pathname.split('/');
                    let filename = split[split.length - 1];
                    if (!filename.includes('.')) {
                        filename += '.html';
                    }
                    const [bufferErr, buffer] = yield util_1.go(resp.buffer());
                    if (bufferErr)
                        throw new Error('Problems retriving buffer');
                    util_1.writeFileSyncRecursive(path.join(process.cwd(), this.hostname, filename), buffer);
                }
                ;
            }));
            yield browser.close();
            return true;
        });
    }
}
exports.default = Html;
//# sourceMappingURL=html.js.map