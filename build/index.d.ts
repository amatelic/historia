#!/usr/bin/env node
import PuppeterURL from './input/url';
import PuppeterHTML from './input/html';
declare const HistoriaFactory: (config?: {}) => {
    html: (html: string) => PuppeterHTML;
    url: (url: string) => PuppeterURL;
};
export default HistoriaFactory;
