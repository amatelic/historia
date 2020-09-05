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
const url_1 = require("../input/url");
function args(state) {
    const [, , ...args] = process.argv;
    return args.reduce((acc, slice) => {
        const item = slice.split("=");
        const size = item.length;
        const key = item[0];
        const value = item[1];
        if (size >= 2 && acc[key]) {
            acc[key] = value;
        }
        else {
            acc['url'] = key;
        }
        return acc;
    }, state);
}
exports.CLI_DEFAULT_ARGS = {
    type: 'url',
    url: '',
    name: Date.now().toString(16) + Math.random().toString(16) + '0',
    output: 'pdf',
    waitUntil: 'networkidle2',
    lazy: true
};
function cli() {
    return __awaiter(this, void 0, void 0, function* () {
        const config = args(exports.CLI_DEFAULT_ARGS);
        if (!config.url)
            throw new Error('Url missing');
        const historia = new url_1.default(config, config.url);
        if (config.output == 'pdf') {
            return yield historia.pdf(`./${config.name}.pdf`).render();
        }
        return yield historia.image(`./${config.name}.${config.output}`);
    });
}
exports.default = cli;
//# sourceMappingURL=cli.js.map