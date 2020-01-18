import PuppeterURL from "../input/url";

type ArgState = { [key:string]: any }; 

function args(state: ArgState) {
    
    const [,, ...args] = process.argv;
    
    return args.reduce((acc: any, slice: string) => {
        const item = slice.split("=");

        const size = item.length;
        const key = item[0];
        const value= item[1];

        if (size >= 2 && acc[key]) {
            acc[key] = value;
        } else {
            acc['url'] = key;
        }

        return acc;

    }, state);
}


export const CLI_DEFAULT_ARGS = {
    type: 'url',
    url: '',
    name: Date.now().toString(16) + Math.random().toString(16) + '0',
    output: 'pdf',
    waitUntil: 'networkidle2',
    lazy: true
};

export default async function cli() {

    const config = args(CLI_DEFAULT_ARGS);

    if (!config.url) throw new Error('Url missing');

    const historia = new PuppeterURL(config, config.url);
    
    if (config.output == 'pdf') {
        return await historia.pdf(`./${config.name}.pdf`).render();
    }
    
    return await historia.image(`./${config.name}.${config.output}`);
}