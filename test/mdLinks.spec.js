import { mdLinks, totalUniqueElements, totalUniqueBrokenElements } from "../src/mdLinks.js";

let result1 = [ { 
 href: 'https://codeburst.io/javascript-in-3-minutes-es-2015-let-const-876cda7bd7e7',
 path: 'C:/Users/Estefanía Telis/Documents/ProyectoNode',
 text: 'JavaScript in 3 Minutes: ES 2015 — let &amp; const' },
{ href: 'https://twitter.com/frankynztein/lists/a',
 path: 'C:/Users/Estefanía Telis/Documents/ProyectoNode',
 text: 'Twitter page doesn&#39;t exist' },
{ href: 'https://twiter.com/',
 path: 'C:/Users/Estefanía Telis/Documents/ProyectoNode',
 text: 'Este enlace no existe' },
{ href: 'https://www.youtube.com/watch?v=zT5yR2E-GGU',
 path: 'C:/Users/Estefanía Telis/Documents/ProyectoNode',
 text: 'YouTube Bien' },
{ href: 'https://www.yotuve.com/watch?v=zT5yR2E-GGU',
 path: 'C:/Users/Estefanía Telis/Documents/ProyectoNode',
 text: 'YouTube Mal' },
{ href: 'https://github.com/frankynztein/c',
 path: 'C:/Users/Estefanía Telis/Documents/ProyectoNode',
 text: 'GitHub 404' } ]

 let result2 = [ { 
  href: 'https://codeburst.io/javascript-in-3-minutes-es-2015-let-const-876cda7bd7e7',
 path: 'C:/Users/Estefanía Telis/Documents/ProyectoNode',
 text: 'JavaScript in 3 Minutes: ES 2015 — let &amp; const',
 status: 200,
 statusText: 'OK' },
{ href: 'https://twitter.com/frankynztein/lists/a',
 path: 'C:/Users/Estefanía Telis/Documents/ProyectoNode',
 text: 'Twitter page doesn&#39;t exist',
 status: 404,
 statusText: 'Not Found' },
{ href: 'https://twiter.com/',
 path: 'C:/Users/Estefanía Telis/Documents/ProyectoNode',
 text: 'Este enlace no existe',
 status: 'Fail',
 statusText: 'Fail' },
{ href: 'https://www.youtube.com/watch?v=zT5yR2E-GGU',
 path: 'C:/Users/Estefanía Telis/Documents/ProyectoNode',
 text: 'YouTube Bien',
 status: 200,
 statusText: 'OK' },
{ href: 'https://www.yotuve.com/watch?v=zT5yR2E-GGU',
 path: 'C:/Users/Estefanía Telis/Documents/ProyectoNode',
 text: 'YouTube Mal',
 status: 'Fail',
 statusText: 'Fail' },
{ href: 'https://github.com/frankynztein/c',
 path: 'C:/Users/Estefanía Telis/Documents/ProyectoNode',
 text: 'GitHub 404',
 status: 404,
 statusText: 'Not Found' } ]

 let result3 = [{
 href: 'https://twiter.com/frankynztein/lists/b',
 path: 'C:/Users/Estefanía Telis/Documents/ProyectoNode/prueba-mdlinks.md',
 text: 'Broken Twitter',
 status: 'Fail',
 statusText: 'Fail' }]


describe('mdLinks', () => {
  it('Debería retornar un array de objetos con 3 propiedades cuando validate es false', () => {
    return mdLinks('C:/Users/Estefanía Telis/Documents/ProyectoNode', { validate : false }).catch(result => {
      expect(result).toEqual(result1)
    });
  });

  it('Debería retornar un array de objetos con 5 propiedades cuando validate es true', () => {
    mdLinks('C:/Users/Estefanía Telis/Documents/ProyectoNode', { validate : true }).then(result => {
      expect(result).toEqual(result2)
    });
  });

  it('Debería retornar Fail en las propiedades status y statusText', () => {
    mdLinks('C:/Users/Estefanía Telis/Documents/ProyectoNode/prueba-mdlinks.md', {validate: true}).catch(result => {
      expect(result).toEqual(result3)
    });
  });

  // it('Debería retornar mensaje de error', () => {
  //   mdLinks('C:/Uses/Estefanía Telis/Documents/ProyectoNode/prueba-mdlinks.md', {validate: true}).catch(result => {
  //     expect(result).toEqual('')
  //   });
  // });
});

describe('totalUniqueElements', () => {
  it('Debería retornar el total de enlaces y cuántos son únicos', () => {
    expect(totalUniqueElements(result1)).toEqual(`Total: 6 \nUnique: 6`)
  });
});

describe('totalUniqueBrokenElements', () => {
  it('Debería retornar el total de enlaces, cuántos son únicos y cuáles están rotos', () => {
    expect(totalUniqueBrokenElements(result2)).toEqual(`Total: 6 \nUnique: 6 \nBrokenLinks: 4`)
  });
});