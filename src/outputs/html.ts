import { PuppeterPromise } from '../utils/types';
import { URL } from 'url'
import * as path from 'path';
import { writeFileSyncRecursive, go } from '../utils/util';

export default class Html {

    constructor(private hostname: string, private puppeterPromise: PuppeterPromise) { }

    async download(): Promise<any> {
      const [ browser, page ] = await this.puppeterPromise();

      const responses: any[] = [];

      page.on('response', resp => {
          console.log(responses);
          responses.push(resp);
      });

      page.on('load', async () => {
        for (const resp of responses) {
          const [requestErr ,request] = await go(resp.request());

          if (requestErr) throw new Error('Problems fetching request');

          const url = new URL(request.url);
      
          const split = url.pathname.split('/');
          let filename = split[split.length - 1];

          if (!filename.includes('.')) {
            filename += '.html';
          }
      
          const [bufferErr, buffer] = await go(resp.buffer());

          if (bufferErr) throw new Error('Problems retriving buffer');

          writeFileSyncRecursive(path.join(process.cwd(), this.hostname, filename), buffer);
      }; 
    });

    await browser.close();

    return true;
  }
}