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
const html_1 = require("../input/html");
const fs = require('fs').promises;
const path = require('path');
const looksSame = require('looks-same');
const isTheSame = (image1, image2) => {
    return new Promise((resolve, reject) => {
        looksSame(image1, image2, (error, res) => {
            return error ? reject(error) : resolve(res.equal);
        });
    });
};
afterEach(() => {
});
// describe('Testing template generation', () => {
//     it('Should generate image from url', async () => {
//         const historia = new PuppeterURL({} as any, 'http://example.com');
//         const testPath = path.join(__dirname, './example.png'); 
//         const fetchPath = path.join(__dirname, './example-test.png');
//         await historia.image(fetchPath).generate();
//         const isEqual = await isTheSame(testPath, fetchPath);
//         expect(isEqual).toBeTruthy();
//     });
// });
// describe('Testing template generation', () => {
//     it('Should generate image from html', async () => {
//         const template = fs.readFileSync(path.join(__dirname, 'template.hbs'), 'utf8');
//         const historia = new PuppeterHTML({} as any, template);
//         const testPath = path.join(__dirname, './example.png'); 
//         const fetchPath = path.join(__dirname, './example-gdo.png');
//         await historia.image(fetchPath).setFullPage().generate();
//         const isEqual = await isTheSame(testPath, fetchPath);
//         expect(isEqual).toBeTruthy();
//     });
// });
describe('Testing template generation', () => {
    const pdfFetchPath = path.join(__dirname, './example-gdo.pdf');
    const fetchImagePath = path.join(__dirname, './example-gdo.png');
    const testImagePath = path.join(__dirname, './example-test.png');
    const testImage = path.join(__dirname, './example.png');
    const templateUrl = path.join(__dirname, 'template.hbs');
    afterEach(() => __awaiter(this, void 0, void 0, function* () {
        yield fs.unlink(pdfFetchPath);
        yield fs.unlink(fetchImagePath);
        yield fs.unlink(pdfFetchPath);
    }));
    it('Should generate image from html', () => __awaiter(this, void 0, void 0, function* () {
        const template = yield fs.readFile(templateUrl, 'utf8');
        const historia = new html_1.default({}, template);
        yield historia.image(fetchImagePath).setFullPage().generate();
        let isEqual = yield isTheSame(testImage, fetchImagePath);
        expect(isEqual).toBeFalsy();
        yield historia.image(testImagePath).setFullPage().generate();
        isEqual = yield isTheSame(testImage, testImagePath);
        expect(isEqual).toBeTruthy();
    }), 30000);
    it('Should generate pdf from html', () => __awaiter(this, void 0, void 0, function* () {
        console.log(fs);
        const template = yield fs.readFile(templateUrl, 'utf8');
        const historia = new html_1.default({}, template);
        yield historia.pdf(pdfFetchPath).render();
        const isTrue = yield fs.stats(pdfFetchPath);
        expect(isTrue).toBeTruthy();
    }), 30000);
});
//# sourceMappingURL=generate.spec.js.map