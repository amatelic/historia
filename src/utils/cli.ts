export default function args(state: { [key:string]: any }) {
    
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