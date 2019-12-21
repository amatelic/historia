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