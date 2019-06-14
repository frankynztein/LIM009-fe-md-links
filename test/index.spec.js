import { isPathAbsolute, isPathAFile, pathExtName } from "../src/index.js";

describe ('isPathAbsolute', () => {
  it('Debería ser true para ruta absoluta', () => {
    expect(isPathAbsolute('C:/Users/Estefanía Telis/Documents/GitHub/LIM009-fe-md-links')).toEqual(true);
  });

  it('Debería retornar una ruta absoluta cuando el argumento es una ruta relativa', () => {
    expect(isPathAbsolute('README.md')).toBe("C:\\Users\\Estefanía Telis\\Documents\\GitHub\\LIM009-fe-md-links\\README.md");
  });
});

describe ('isPathAFile', () => {
  test('Debería ser true para archivo', () => {
    return isPathAFile('C:/Users/Estefanía Telis/Documents/GitHub/LIM009-Cipher/README.md').then((result) => {
      expect(result).toBe(true);
    });
  });

  test('Debería ser false para carpeta', () => {
    return isPathAFile('C:/Users/Estefanía Telis/Documents/GitHub/LIM009-Cipher').then((result) => {
      expect(result).toBe(false);
    });
  });
});

describe ('pathExtName', () => {
  it('Debería crear un array con la ruta del archivo con extensión .md', () => {
    expect(pathExtName('C:/Users/Estefanía Telis/Documents/GitHub/LIM009-Cipher/README.md')).toEqual(['C:/Users/Estefanía Telis/Documents/GitHub/LIM009-Cipher/README.md'])
  })
})