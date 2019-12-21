#!/usr/bin/env node
import PuppeterURL from './input/url';
import PuppeterHTML from './input/html';
import args from './cli';

// Implement 
export interface HistoriaArgs {
    slowMO?: number;
    devtools?: boolean;
    args?: string[];
    headless: boolean;
    executablePath: string,
    lazy: boolean;
    timeout: number,
}

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

    const state = Object.assign({ lazy: true, timeout: 5000}, config)

    switch (process.platform) {
        case 'darwin': 
            return new Historia({
                ...state,
                headless: true,
                executablePath: '/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome',
            })
        case 'linux': 
            // execute command for retriving path to chrome -> which google-chrome-stable
            return new Historia({
                ...state,
                headless: true,
                executablePath: '',
            })
        default: 
            throw new Error(`${process.platform} is not supported`);

    }
}


if (require.main === module) {

    const state = {
        type: 'url',
        url: '',
        name: Date.now().toString(16) + Math.random().toString(16) + '0',
        output: 'pdf',
        lazy: false
    };
    
    const config = args(state);

    (async () => {
        if (config.output == 'pdf') {
            await (HistoriaFactory()).url(config.url)
                .pdf(`./${config.name}.pdf`, 'A4')
                .render();
        } else {
            await (HistoriaFactory()).url(config.url)
            .image(`./${config.name}.${config.output}`);
        }
    })()
} else {
    module.exports = HistoriaFactory;
}