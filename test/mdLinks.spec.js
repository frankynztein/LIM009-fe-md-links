import mock from 'mock-fs';
import path from 'path';
import fetchMock from '../__mocks__/node-fetch.js';

import { mdLinks, totalUniqueElements, totalUniqueBrokenElements } from "../src/mdLinks.js";

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


describe('mdLinks', () => {
  it('Debería retornar un array de objetos con 3 propiedades cuando validate es false', () => {
    return mdLinks(path.join(process.cwd(), 'fakePath', 'someFile.md'), { validate : false }).catch(result => {
      expect(result).toEqual([{
        "href": "https://francireearellan.com",
        "path": path.join(process.cwd(), 'fakePath', 'someFile.md'),
        "text": "Fran"
      }])
    });
  });

  it('Debería retornar un array de objetos con 5 propiedades cuando validate es true', () => {
    return mdLinks(path.join(process.cwd(), 'fakePath', 'someFile.md'), { validate : true }).then(result => {
      expect(result).toEqual([{
        "href": "https://francireearellan.com",
        "path": path.join(process.cwd(), 'fakePath', 'someFile.md'),
        "text": "Fran",
        "status": 200,
        "statusText": "OK"
      }])
    });
  });

  it('Debería retornar mensaje de error', () => {
    mdLinks('C:/Uses/Estefanía Telis/Documents/ProyectoNode/prueba-mdlinks.md', {validate: true}).catch(result => {
      expect(result.code).toEqual('ENOENT')
    });
  });
});

describe('totalUniqueElements', () => {
  it('Debería retornar el total de enlaces y cuántos son únicos', () => {
    expect(totalUniqueElements([{
      "href": "https://www.google.com/",
      "path": path.join(process.cwd(), 'fakePath', 'mdFile.md'), 
      "text": "Working Google"}, 
      {"href": "https://github.com/frankynztein/c", 
      "path": path.join(process.cwd(), 'fakePath', 'mdFile.md'), 
      "text": "Not found Github"}])).toEqual(`Total: 2 \nUnique: 2`)
  });
});

describe('totalUniqueBrokenElements', () => {
  it('Debería retornar el total de enlaces, cuántos son únicos y cuáles están rotos', () => {
    expect(totalUniqueBrokenElements([{
      "href": "https://www.google.com/",
      "path": path.join(process.cwd(), 'fakePath', 'mdFile.md'), 
      "text": "Working Google",
      "status": 200,
      "statusText": 'OK'}, 
      {"href": "https://github.com/frankynztein/c", 
      "path": path.join(process.cwd(), 'fakePath', 'mdFile.md'), 
      "text": "Not found Github",
      "status": 404,
      "statusText": "Not Found"}])).toEqual(`Total: 2 \nUnique: 2 \nBrokenLinks: 1`)
  });
});