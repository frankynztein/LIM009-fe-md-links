import { mdLinksCli } from '../src/cli.js';
import { process } from 'process';
import { path } from 'path';
import { mock } from 'mock-fs';

import { fetchMock } from '../__mock__/node-fetch.js';


// fetchMock.config.sendAsJson = false;

fetchMock.mock('https://www.youtube.com/watch?v=zT5yR2E-GGU', 200)
fetchMock.mock('https://www.yotuve.com/watch?v=zT5yR2E-GGU', 'Fail')
fetchMock.mock('https://github.com/frankynztein/c', 404)

  beforeEach(()=> {
    mock({
      'fake/mock/dir': {
        'some-file.md': '[Un enlace de Youtube que funciona](https://www.youtube.com/watch?v=zT5yR2E-GGU)',
        'empty-folder': {},
        'another-folder': {
          'another-file.md': '[Not found message](https://github.com/frankynztein/c). Y otro enlace por aquí [Que no existe](https://www.yotuve.com/watch?v=zT5yR2E-GGU)'
        }
      },
      'path/to/empty-file.md': 'Un archivo sin enlaces'
    });
  });
  afterEach(mock.restore);


describe('mdLinksCli', () => {
  beforeAll(() => fetchMock.config.fallbackToNetwork = true);

  it('Debería ser una función', () => {
    expect(typeof mdLinksCli).toBe('function')
  });

  afterAll(() => fetchMock.config.fallbackToNetwork = false);
});

// describe('mdLinksCli', () => {
//   it('Debería ser una función', () => {
//     expect(typeof mdLinksCli).toBe('function')
//   });

//   it('Debería retornar un ')
// });