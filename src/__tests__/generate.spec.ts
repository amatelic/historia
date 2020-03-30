import PuppeterHTML from "../input/html";

const fs = require('fs').promises;
const path = require('path');
const looksSame = require('looks-same');


const isTheSame = (image1: string, image2: string) => {
    return new Promise((resolve, reject) => {
        looksSame(image1, image2, (error: any, res: any) => {
            return error ? reject(error) : resolve(res.equal);
        });
    })
}

afterEach(() => {
});

// describe('Testing template generation', () => {
//     it('Should generate image from url', async () => {
//         const historia = new PuppeterURL({} as any, 'http://example.com');
//         const testPath = path.join(__dirname, './example.png'); 
//         const fetchPath = path.join(__dirname, './example-test.png');
//         await historia.image(fetchPath).generate();
//         const isEqual = await isTheSame(testPath, fetchPath);
//         expect(isEqual).toBeTruthy();
//     });
// });


// describe('Testing template generation', () => {
//     it('Should generate image from html', async () => {
//         const template = fs.readFileSync(path.join(__dirname, 'template.hbs'), 'utf8');
//         const historia = new PuppeterHTML({} as any, template);
//         const testPath = path.join(__dirname, './example.png'); 
//         const fetchPath = path.join(__dirname, './example-gdo.png');
//         await historia.image(fetchPath).setFullPage().generate();
//         const isEqual = await isTheSame(testPath, fetchPath);
//         expect(isEqual).toBeTruthy();
//     });
// });

describe('Testing template generation', () => {

    const pdfFetchPath = path.join(__dirname, './example-gdo.pdf');
    const fetchImagePath = path.join(__dirname, './example-gdo.png');
    const testImagePath = path.join(__dirname, './example-test.png'); 

    const testImage = path.join(__dirname, './example.png'); 
    const templateUrl =  path.join(__dirname, 'template.hbs');


    afterEach(async () => {
        await fs.unlink(pdfFetchPath);
        await fs.unlink(fetchImagePath);
        await fs.unlink(pdfFetchPath);
    });

    it('Should generate image from html', async () => {
        const template = await fs.readFile(templateUrl, 'utf8');
        const historia = new PuppeterHTML({} as any, template);
        await historia.image(fetchImagePath).setFullPage().generate();
        let isEqual = await isTheSame(testImage, fetchImagePath);

        expect(isEqual).toBeFalsy();

        await historia.image(testImagePath).setFullPage().generate();
        isEqual = await isTheSame(testImage, testImagePath);
        expect(isEqual).toBeTruthy();

    }, 30000);


    it('Should generate pdf from html', async () => {
        console.log(fs)
        const template = await fs.readFile(templateUrl, 'utf8');
        const historia = new PuppeterHTML({} as any, template);
        await historia.pdf(pdfFetchPath).render();
        const isTrue = await fs.stats(pdfFetchPath);
        expect(isTrue).toBeTruthy();
    }, 30000);
});