import Pdf from "../pdf";


describe('Testing pdf class', () => {

    it('Set configuration for margin', () => {

        const marginConfig = {
            margin: {
                top: 50, left: 250, bottom: 10, right: 50
            }
        };

        const pdf = new Pdf();

        pdf.setMargin(50, 50, 10, 250);

        expect(pdf.getConfig()).toEqual(marginConfig);


        pdf.setToLandScape()

        expect(pdf.getConfig()).toEqual(Object.assign({},
            marginConfig, { landscape: true },
        ))
    });

});