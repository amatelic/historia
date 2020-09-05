"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pdf_1 = require("../outputs/pdf");
describe('Testing pdf class', () => {
    it('Set configuration for margin', () => {
        const config = {
            displayHeaderFooter: false,
            landscape: false,
            footerTemplate: "",
            headerTemplate: "",
            path: "",
            printBackground: true,
            margin: {
                top: 50, left: 250, bottom: 10, right: 50
            }
        };
        const viewport = {
            _viewPort: undefined,
            _waitUntil: 'load',
            _output: 'A4'
        };
        const promiseMock = () => Promise.resolve();
        const pdf = new pdf_1.default('/path', promiseMock, viewport);
        pdf.setMargin(50, 50, 10, 250);
        expect(pdf.getConfig()).toEqual(config);
        pdf.setToLandScape();
        expect(pdf.getConfig()).toEqual(Object.assign({}, config, { landscape: true }));
    });
});
//# sourceMappingURL=pdf.spec.js.map