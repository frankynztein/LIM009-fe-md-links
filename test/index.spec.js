import mock from 'mock-fs';
import path from 'path';
import fetchMock from '../__mocks__/node-fetch.js';
import { isPathAbsolute, isPathAFile, isFileMd, readFilesSync, readAllDirectory, markdownLinkExtractor, validateLinks, getLinksObject } from "../src/index.js";

fetchMock
  .mock('https://github.com/frankynztein/c', 404)
  .mock('https://www.google.com/', 200)
  .mock('https://francireearellan.com', 'Fail')

beforeAll(() => {
  mock({
    'fakePath': {
      'mdFile.md': '[Working Google](https://www.google.com/) [Not found Github](https://github.com/frankynztein/c)',
      'otherPath': {
        'file.html': 'Hello, world',
        'anotherFile.MD':'[Fail Youtube](https://www.yotuveeeeee.com/watch?v=zT5yR2E) [Working Google](https://www.google.com/)'
      },
      'someFile.md': '[Fran](https://francireearellan.com)' 
    },
  });
})

afterAll(mock.restore)

describe('isPathAbsolute', () => {
  it('Debería ser una función', () => {
    expect(typeof isPathAbsolute).toBe('function');
  });

  it('Debería ser true para ruta absoluta', () => {
    expect(isPathAbsolute(path.join(process.cwd(), 'fakePath', 'mdFile.md'))).toBe(true);
  });

  it('Debería retornar una ruta absoluta cuando el argumento es una ruta relativa', () => {
    expect(isPathAbsolute('README.md')).toBe(path.join(process.cwd(), 'README.md'));
  });
});

describe ('isPathAFile', () => {
  it('Debería ser true para una ruta que sea de archivo', () => {
    expect(isPathAFile(path.join(process.cwd(),'fakePath', 'mdFile.md'))).toBe(true);
  });

  it('Debería ser false para una ruta que no sea de archivo', () => {
    expect(isPathAFile(path.join(process.cwd(), 'fakePath'))).toBe(false);
  });

  it('Debería dar error para una ruta no válida', () => {
    try {
      isPathAFile('C:/Not/A/Valid/Route/')
    } catch (error) {
      expect(error.code).toBe('ENOENT')
    };
  });
});

describe ('isFileMd', () => {
  it('Debería retornar true cuando la ruta es un archivo con extensión .md', () => {
    expect(isFileMd(path.join(process.cwd(), 'fakePath', 'mdFile.md'))).toBe(true);
  });

  it('Debería retornar true cuando la ruta es un archivo con extensión .MD', () => {
    expect(isFileMd(path.join(process.cwd(), 'fakePath', 'otherPath', 'anotherFile.MD'))).toBe(true)
  });

  it('Debería retornar false cuando el archivo no es .md', () => {
    expect(isFileMd(path.join(process.cwd(), 'fakePath', 'otherPath', 'file.html'))).toBe(false)
  });
});

describe('readFilesSync', () => {
  it('Debería leer el contenido del archivo markdown', () => {
    expect(readFilesSync(path.join(process.cwd(), 'fakePath','mdFile.md'))).toBe('[Working Google](https://www.google.com/) [Not found Github](https://github.com/frankynztein/c)')
  });
});

describe('readAllDirectory', () => {
  it('Debería darme un array con todos los archivos .md en una ruta de carpeta', () => {
    expect(readAllDirectory(path.join(process.cwd(), 'fakePath'))).toEqual([path.join(process.cwd(), 'fakePath', 'mdFile.md'), path.join(process.cwd(), 'fakePath', 'otherPath', 'anotherFile.MD'), path.join(process.cwd(), 'fakePath', 'someFile.md')]);
  });

  it('Debería darme un array con la ruta del archivo', () => {
    expect(readAllDirectory(path.join(process.cwd(), 'fakePath', 'mdFile.md'))).toEqual([path.join(process.cwd(), 'fakePath', 'mdFile.md')]);
  });
});

describe('markdownLinkExtractor', () => {
  it('Debería darme un array de objetos con tres propiedades: href, path y text', () => {
    expect(markdownLinkExtractor('[Working Google](https://www.google.com/) [Not found Github](https://github.com/frankynztein/c)', path.join(process.cwd(), 'fakePath', 'mdFile.md')))
    .toEqual([{
      "href": "https://www.google.com/",
      "path": path.join(process.cwd(), 'fakePath', 'mdFile.md'), 
      "text": "Working Google"}, 
      {"href": "https://github.com/frankynztein/c", 
      "path": path.join(process.cwd(), 'fakePath', 'mdFile.md'), 
      "text": "Not found Github"}])
  });
});

describe('validateLinks', () => {
    it('Debería retornar un array de objetos con cinco propiedades: href, path., text, status y statusText', (done) => {
      return validateLinks([{
        "href": "https://www.google.com/",
        "path": path.join(process.cwd(), 'fakePath', 'mdFile.md'), 
        "text": "Working Google"}, 
        {"href": "https://github.com/frankynztein/c", 
        "path": path.join(process.cwd(), 'fakePath', 'mdFile.md'), 
        "text": "Not found Github"}]).then(result => {
        expect(result).toEqual([{
          "href": "https://www.google.com/",
          "path": path.join(process.cwd(), 'fakePath', 'mdFile.md'), 
          "text": "Working Google",
          "status": 200,
          "statusText": 'OK'}, 
          {"href": "https://github.com/frankynztein/c", 
          "path": path.join(process.cwd(), 'fakePath', 'mdFile.md'), 
          "text": "Not found Github",
          "status": 404,
          "statusText": "Not Found"}])
        done()
      });
    });

    it('Debería returnar el texto Fail dentro de las propiedades status y statusText cuando el enlace que evalúa no existe', (done) => {
      validateLinks([{
        "href": "https://francireearellan.com",
        "path": path.join(process.cwd(), 'fakePath', 'someFile.md'),
        "text": "Fran"
      }]).catch(err => {
        expect(err).toEqual([{
          "href": "https://francireearellan.com",
          "path": path.join(process.cwd(), 'fakePath', 'someFile.md'),
          "text": "Fran",
          "status": "Fail",
          "statusText": "Fail"}]
        )     
      })
      
      // try {
      //   validateLinks([{
      //     "href": "https://francireearellan.com",
      //     "path": path.join(process.cwd(), 'fakePath', 'someFile.md'),
      //     "text": "Fran"
      //   }])
      // } catch (error) {
      //   expect(error).toEqual([{
      //     "href": "https://francireearellan.com",
      //     "path": path.join(process.cwd(), 'fakePath', 'someFile.md'),
      //     "text": "Fran",
      //     "status": "Fail",
      //     "statusText": "Fail"}]
      //   )
      // }
      done()
    });
});

describe('getLinksObject', () => {
  it('Debería retornar un array de objetos con tres propiedades', () => {
    expect(getLinksObject(path.join(process.cwd(), 'fakePath', 'someFile.md'))).toEqual([{
      "href": "https://francireearellan.com",
      "path": path.join(process.cwd(), 'fakePath', 'someFile.md'),
      "text": "Fran"
    }]);
    });
});