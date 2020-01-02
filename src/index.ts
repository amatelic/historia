#!/usr/bin/env node
import PuppeterURL from './input/url';
import PuppeterHTML from './input/html';
import args, { CLI_DEFAULT_ARGS } from './utils/cli';
import { HistoriaArgs } from './utils/types';

class Historia {
    constructor(private config: HistoriaArgs) {}

    html(html: string): PuppeterHTML {
        return new PuppeterHTML(this.config, html);
    }


    url(url: string): PuppeterURL {
        return new PuppeterURL(this.config, url);
    }

}

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

    return new Historia({
        headless: true,
        meta: state,
        executablePath,
    });
}


if (require.main === module) {
    
    const config = args(CLI_DEFAULT_ARGS);

    (async () => {
        try {

            if (!config.url) throw new Error('Url missing');

            const historia = (HistoriaFactory()).url(config.url);

            // await historia.html().download();
            
            if (config.output == 'pdf') {
                await historia.pdf(`./${config.name}.pdf`).render();
            } else {
                await historia.image(`./${config.name}.${config.output}`);
            }   
        } catch (error) {
            process.stderr.write(error.toString());
        }
    })()
} else {
    module.exports = HistoriaFactory;
}