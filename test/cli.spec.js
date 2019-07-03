import  mock  from 'mock-fs';
import path from 'path';
import { mdLinksCli } from '../src/cli.js';
import fetchMock from '../__mocks__/node-fetch.js'

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

const result1 = `https://www.google.com/ - fakePath/mdFile.md - Working Google
https://github.com/frankynztein/c - fakePath/mdFile.md - Not found Github`;

const result2 = `https://www.google.com/ - fakePath/mdFile.md - OK - 200 - Working Google
https://github.com/frankynztein/c - fakePath/mdFile.md - Not Found - 404 - Not found Github`;

const result3 = `Total: 2 \nUnique: 2`;

const result4 = `Total: 2 \nUnique: 2 \nBrokenLinks: 1`

describe('mdLinksCli', () => {
  it('Debería retornar línea de texto con href, path y texto de enlaces encontrados', (done) => {
    mdLinksCli('fakePath/mdFile.md').then(result => {
      expect(result).toEqual(result1)
      done()
    });
  });

  it('Debería retornar línea de texto con href, path, texto, status y statusTex de enlaces encontrados cuando paso ruta y --validate como argumentos', (done) => {
    mdLinksCli('fakePath/mdFile.md', '--validate').then(result => {
      expect(result).toEqual(result2)
      done()
    });
  });

  it('Debería retornar línea de texto con Total y Unique cuando paso ruta y --stats como argumentos', (done) => {
    mdLinksCli('fakePath/mdFile.md', '--stats').then(result => {
      expect(result).toEqual(result3)
      done()
    });
  });

  it('Debería retornar línea de texto con Total, Unique y BrokenLinks cuando paso ruta, --validate y --stats como argumentos', (done) => {
    mdLinksCli('fakePath/mdFile.md', '--validate', '--stats').then(result => {
      expect(result).toEqual(result4)
      done()
    });
  });

  // it('Debería retornar ERROR', (done) => {
  //   mdLinksCli('/fakePat', '--validate', '--stats').catch(err => {
  //     expect(err).toEqual('')
  //     done()
  //   });
  // });
})