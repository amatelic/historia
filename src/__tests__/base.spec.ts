import PuppeterBase from "../base";


describe('Testing base class', () => {

    it('Set configuration for margin', () => {

        const base = new PuppeterBase({});

        base.setViewPort(500, 400);

        expect(base.hasViewPort()).toBe(true);


        base.waitUntil('networkidle2');
        base.setOutputView('A6');

        const config = base.getConfig();

        expect(config.waitUntil).toBe('networkidle2');
        expect(config.output).toBe('A6');

    });

});