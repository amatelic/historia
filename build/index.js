#!/usr/bin/env node
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
const url_1 = require("./input/url");
const html_1 = require("./input/html");
const cli_1 = require("./utils/cli");
const HistoriaFactory = (config = {}) => {
    const state = Object.assign({ lazy: true, timeout: 5000 }, config);
    let executablePath = '/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome';
    switch (process.platform) {
        case 'darwin':
            break;
        case 'linux':
            executablePath = '';
            break;
        default:
            throw new Error(`${process.platform} is not supported`);
    }
    ;
    const data = {
    // headless: true,
    // meta: state,
    // executablePath,
    };
    return {
        html: (html) => new html_1.default(data, html),
        url: (url) => new url_1.default(data, url),
    };
};
if (require.main === module) {
    (() => __awaiter(this, void 0, void 0, function* () {
        return cli_1.default()
            .catch((err) => {
            console.error(err);
            process.exit(1);
        });
    }))();
}
exports.default = HistoriaFactory;
//# sourceMappingURL=index.js.map