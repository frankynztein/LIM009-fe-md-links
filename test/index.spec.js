import { isPathAbsolute, isPathAFile, pathExtName, readFilesSync, readAllDirectory, markdownLinkExtractor, validateLinks, threePropertiesObject } from "../src/index.js";

let array1 = [{
  href: 'https://www.youtube.com/watch?v=zT5yR2E-GGU',
path: 'C:/Users/Estefanía Telis/Documents/ProyectoNode/tres-enlaces.md',
text: 'YouTube Bien' },
{ href: 'https://www.yotuve.com/watch?v=zT5yR2E-GGU',
path: 'C:/Users/Estefanía Telis/Documents/ProyectoNode/tres-enlaces.md',
text: 'YouTube Mal' },
{ href: 'https://github.com/frankynztein/c',
path: 'C:/Users/Estefanía Telis/Documents/ProyectoNode/tres-enlaces.md',
text: 'GitHub 404' }]

let array2 = [ {
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
 text: 'GitHub 404' } ];

 let array3 = [{
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
  statusText: 'Not Found' }];

let array4 = [{
  href: 'https://twiter.com/',
  path: 'C:/Users/Estefanía Telis/Documents/ProyectoNode',
  text: 'Este enlace no existe'}];

let array5 = [{
  href: 'https://twiter.com/',
  path: 'C:/Users/Estefanía Telis/Documents/ProyectoNode',
  text: 'Este enlace no existe',
  status: 'Fail',
  statusText: 'Fail' }];

let array6 = [ { 
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

describe('isPathAbsolute', () => {
  it('Debería ser una función', () => {
    expect(typeof isPathAbsolute).toBe('function');
  });

  it('Debería ser true para ruta absoluta', () => {
    expect(isPathAbsolute('C:/Users/Estefanía Telis/Documents/GitHub/LIM009-fe-md-links')).toBe(true);
  });

  it('Debería retornar una ruta absoluta cuando el argumento es una ruta relativa', () => {
    expect(isPathAbsolute('README.md')).toBe("C:\\Users\\Estefanía Telis\\Documents\\GitHub\\LIM009-fe-md-links\\README.md");
  });
});

describe ('isPathAFile', () => {
  it('Debería ser true para una ruta que sea de archivo', () => {
    expect(isPathAFile('C:/Users/Estefanía Telis/Documents/Prueba/filereadme1.md')).toBe(true);
  });

  it('Debería ser false para una ruta que no sea de archivo', () => {
    expect(isPathAFile('C:/Users/Estefanía Telis/Documents/Prueba/')).toBe(false);
  });

  it('Debería dar error para una ruta no válida', () => {
    try {
      isPathAFile('C:/Not/A/Valid/Route/')
    } catch (error) {
      expect(error.code).toBe('ENOENT')
    };
  });
});

describe ('pathExtName', () => {
  it('Debería crear un array con la ruta del archivo con extensión .md', () => {
    expect(pathExtName('C:/Users/Estefanía Telis/Documents/GitHub/LIM009-Cipher/README.md')).toEqual(true)
  });

  it('Debería arrojar un error cuando el archivo no es .md', () => {
    expect(pathExtName('C:/Users/Estefanía Telis/Documents/GitHub/LIM009-Cipher/README.html')).toBe(false)
  });
});

describe('readFilesSync', () => {
  it('Debería leer el contenido del archivo markdown', () => {
    expect(readFilesSync('C://Users//Estefanía Telis//Documents//Prueba//filereadme1.md')).toBe('Using VanillaJS, HTML and CSS, **AREA 51 CIPHER** is a web application created to provide security to those who work in the Tech Area when they share information.')
  });
});

describe('readAllDirectory', () => {
  it('Debería darme un array con todos los archivos .md en una ruta de carpeta', () => {
    expect(readAllDirectory('C:/Users/Estefanía Telis/Documents/Prueba')).toEqual(['C:\\Users\\Estefanía Telis\\Documents\\Prueba\\filereadme1.md',
    'C:\\Users\\Estefanía Telis\\Documents\\Prueba\\filereadme2.md',
    'C:\\Users\\Estefanía Telis\\Documents\\Prueba\\prueba1\\prueba1-2\\prueba1-2.md']);
  });

  it('Debería darme un array con la ruta del archivo', () => {
    expect(readAllDirectory('C:/Users/Estefanía Telis/Documents/GitHub/LIM009-Cipher/README.md')).toEqual(['C:/Users/Estefanía Telis/Documents/GitHub/LIM009-Cipher/README.md']);
  });

  // REVISAR ESTE TEST
  it('Debería arrojar un console.log - No es archivo markdown cuando el archivo de la ruta no es .md', () => {
    expect(readAllDirectory('C:/Users/Estefanía Telis/Documents/Prueba/prueba2/prueba.js')).toEqual([]);
  })
});

describe('markdownLinkExtractor', () => {
  it('Debería darme un array de objetos con tres propiedades: href, path y text', () => {
    expect(markdownLinkExtractor('[YouTube Bien](https://www.youtube.com/watch?v=zT5yR2E-GGU) [YouTube Mal](https://www.yotuve.com/watch?v=zT5yR2E-GGU) [GitHub 404](https://github.com/frankynztein/c)', 'C:/Users/Estefanía Telis/Documents/ProyectoNode/tres-enlaces.md'))
    .toEqual(array1)
  });
});

describe('validateLinks', () => {
    it('Debería retornar un array de objetos con cinco propiedades: href, path., text, status y statusText', (done) => {
      return validateLinks(array2).then(result => {
        expect(result).toEqual(array3)
        done()
      });
    });

    it('Debería returnar el texto Fail dentro de las propiedades status y statusText cuando el enlace que evalúa no existe', () => {
      return validateLinks(array4).catch(result => {
        expect(result).toEqual(array5)
      });
    });
});

describe('threePropertiesObject', () => {
  it('Debería retornar un array de objetos con tres propiedades', () => {
    expect(threePropertiesObject('C:/Users/Estefanía Telis/Documents/ProyectoNode')).toEqual(array6)
    });
});