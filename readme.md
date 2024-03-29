# Historia 

**Summary** 

A basic abstraction over the puppeteer framework for easier generation of pdfs and images.


## Installation

Historia requires node v7.6.0 or greater for ES2015 and async function support.



```
$ npm install @gdo/historia
```

or

```
yarn add @gdo/historia
```

## Basic use

General description of how to use the module with basic example.  

## Example (using like an npm module)

Basic example of creating an pdf file with url
```nodejs

(async () => {

    await (new Historia()).url('http://example.com/')
        .pdf('./example.pdf', 'A4')
        .setMargin(50, 50, 50, 50)
        .setToLandScape(true)
        .render()
})();

```

Basic example of creating an img file with html
```nodejs

(async () => {
    await (new Historia()).html(`<h1>Hello World</h1>`)
        .setViewPort(2200, 1200)
        .image('test.jpeg', 'jpeg');
})();

```

## Example (using cli)
```
historia http://example.com
historia type=url http://example.com output=jpeg
```

#### !Important 

when working with pdf add below css to make the page look identical

```css
html {
      -webkit-print-color-adjust: exact;
}
```
## Tests

```
npm run test
```

## Docs

```
npm run doc
```


### TODO 
 - [ x ] Add support for generating pdf
 - [ x ] Add support for generating image 
 - [   ] Add support for generating html 

### TO FIX

- Find solution for rendering pages with lazy image loading (example: medium);

## Test
    
## Contributors

Author [Anže Matelič](https://github.com/amatelic)

## License

[MIT](LICENSE)