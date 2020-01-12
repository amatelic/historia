#!/usr/bin/env node
import PuppeterURL from './input/url';
import PuppeterHTML from './input/html';
import cli, { CLI_DEFAULT_ARGS } from './utils/cli';

class Historia {
    constructor(private config: any = ({} as any)) {}

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
    };

    const data = {
        // headless: true,
        // meta: state,
        // executablePath,
    } as any;

    return {
        html: (html: string): PuppeterHTML => new PuppeterHTML(data, html),
        url: (url: string): PuppeterURL => new PuppeterURL(data, url),
    };
}


if (require.main === module) {
    (async () => {
        return cli()
            .catch((err)  => {
                console.error(err);
                process.exit(1);
            });
    })()
} else {
    module.exports = HistoriaFactory;
}