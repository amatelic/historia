import PuppeterURL from './input/url';
import PuppeterHTML from './input/html';

// Implement 
export interface HistoriaArgs {
    slowMO?: number;
    devtools?: boolean;
    args?: string[];
    headless: boolean;
    executablePath: string,
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




const HistoriaFactory = () => {

    switch (process.platform)
    {
        case 'darwin': 
            return new Historia({
                headless: true,
                executablePath: '/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome',
            })
        case 'linux': 
            // execute command for retriving path to chrome -> which google-chrome-stable
            return new Historia({
                headless: true,
                executablePath: '',
            })
        default: 
            throw new Error(`${process.platform} is not supported`);

    }
}

export default HistoriaFactory;