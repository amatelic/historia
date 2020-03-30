import Pdf from "../outputs/pdf";
import { waitUntil } from "../utils/types";


describe('Testing pdf class', () => {

    it('Set configuration for margin', () => {

        const config  = {
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
            _waitUntil: 'load' as waitUntil,
            _output: 'A4'
        };

        const promiseMock: () => Promise<any> = () => Promise.resolve();

        const pdf = new Pdf('/path', promiseMock, viewport);

        pdf.setMargin(50, 50, 10, 250);

        expect(pdf.getConfig()).toEqual(config);


        pdf.setToLandScape()

        expect(pdf.getConfig()).toEqual(Object.assign({},
            config, { landscape: true },
        ))
    });

});