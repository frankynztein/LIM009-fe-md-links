import  mock  from 'mock-fs';
import { mdLinksCli } from '../src/cli.js';
import fetchMock from '../__mocks__/node-fetch.js'

fetchMock
  .mock('https://www.google.com/', 200)
  .mock('https://github.com/frankynztein/c', 404)
  .mock('https://www.yotuveeeeee.com/watch?v=zT5yR2E', 'Fail')

beforeAll(() => {
  mock({
    '/fakePath': {
      'mdFile.md': '[Working Google](https://www.google.com/) [Not found Github](https://github.com/frankynztein/c)',
      'otherPath': {
        'file.html': '',
        'anotherFile.md':'[Fail Youtube](https://www.yotuveeeeee.com/watch?v=zT5yR2E) [Working Google](https://www.google.com/)'
      },
      'someFile.md': '[Not found Github](https://github.com/frankynztein/c)' 
    },
  });
})

afterAll(mock.restore)

const result1 = `https://www.google.com/ - \\fakePath\\mdFile.md - Working Google
https://github.com/frankynztein/c - \\fakePath\\mdFile.md - Not found Github
https://www.yotuveeeeee.com/watch?v=zT5yR2E - \\fakePath\\otherPath\\anotherFile.md - Fail Youtube
https://www.google.com/ - \\fakePath\\otherPath\\anotherFile.md - Working Google
https://github.com/frankynztein/c - \\fakePath\\someFile.md - Not found Github`;

const result2 = `https://www.google.com/ - \\fakePath\\mdFile.md - OK - 200 - Working Google
https://github.com/frankynztein/c - \\fakePath\\mdFile.md - Not Found - 404 - Not found Github
https://www.yotuveeeeee.com/watch?v=zT5yR2E - \\fakePath\\otherPath\\anotherFile.md - OK - 200 - Fail Youtube
https://www.google.com/ - \\fakePath\\otherPath\\anotherFile.md - OK - 200 - Working Google
https://github.com/frankynztein/c - \\fakePath\\someFile.md - Not Found - 404 - Not found Github`

const result3 = `Total: 5 \nUnique: 3`

const result4 = `Total: 5 \nUnique: 3 \nBrokenLinks: 2`

describe('mdLinksCli', () => {
  it('Debería retornar línea de texto con href, path y texto de enlaces encontrados', (done) => {
    mdLinksCli('/fakePath').then(result => {
      expect(result).toEqual(result1)
      done()
    });
  });

  it('Debería retornar línea de texto con href, path, texto, status y statusTex de enlaces encontrados cuando paso ruta y --validate como argumentos', (done) => {
    mdLinksCli('/fakePath', '--validate').then(result => {
      expect(result).toEqual(result2)
      done()
    });
  });

  it('Debería retornar línea de texto con Total y Unique cuando paso ruta y --stats como argumentos', (done) => {
    mdLinksCli('/fakePath', '--stats').then(result => {
      expect(result).toEqual(result3)
      done()
    });
  });

  it('Debería retornar línea de texto con Total, Unique y BrokenLinks cuando paso ruta, --validate y --stats como argumentos', (done) => {
    mdLinksCli('/fakePath', '--validate', '--stats').then(result => {
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