import { PuppeterPromise } from '../utils/types';
export default class Html {
    private hostname;
    private puppeterPromise;
    constructor(hostname: string, puppeterPromise: PuppeterPromise);
    download(): Promise<any>;
}
