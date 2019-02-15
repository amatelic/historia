import PuppeterURL from './url';
import PuppeterHTML from './html';

export interface HistoriaArgs {
    headless?: boolean;
    slowMO?: number;
    devtools?: boolean;
    args?: string[]
}

export default class Historia {
    constructor(private config: HistoriaArgs) {}

    html(html: string): PuppeterHTML {
        return new PuppeterHTML(this.config, html);
    }


    url(url: string): PuppeterURL {
        return new PuppeterURL(this.config, url);
    }

}