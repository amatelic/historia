"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PuppeteerFormats {
}
PuppeteerFormats.LETTER = 'Letter';
PuppeteerFormats.LEGAL = 'Legal';
PuppeteerFormats.TABLOID = 'Tabloid';
PuppeteerFormats.LEDGER = 'Ledger';
PuppeteerFormats.A0 = 'A0';
PuppeteerFormats.A1 = 'A1';
PuppeteerFormats.A2 = 'A2';
PuppeteerFormats.A3 = 'A3';
PuppeteerFormats.A4 = 'A4';
PuppeteerFormats.A5 = 'A5';
PuppeteerFormats.A6 = 'A6';
exports.PuppeteerFormats = PuppeteerFormats;
class PuppeteerImageTypes {
}
PuppeteerImageTypes.JPEG = 'jpeg';
PuppeteerImageTypes.PNG = 'png';
exports.PuppeteerImageTypes = PuppeteerImageTypes;
exports.pdfDefault = {
    path: '',
    printBackground: true,
    margin: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    },
    headerTemplate: '',
    footerTemplate: '',
    landscape: false,
    displayHeaderFooter: false,
};
//# sourceMappingURL=types.js.map