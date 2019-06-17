import { isPathAbsolute, isPathAFile, pathExtName, readDirectorySync, readFilesSync } from "../src/index.js";

const array1 = ['filereadme1.md', 'filereadme2.md', 'package-lock.json', 'prueba1', 'prueba2', 'prueba3'];
const array2 = [ 'C:\\Users\\Estefanía Telis\\Documents\\Prueba\\filereadme1.md',
'C:\\Users\\Estefanía Telis\\Documents\\Prueba\\filereadme2.md',
'C:\\Users\\Estefanía Telis\\Documents\\Prueba\\package-lock.json',
'C:\\Users\\Estefanía Telis\\Documents\\Prueba\\prueba1',
'C:\\Users\\Estefanía Telis\\Documents\\Prueba\\prueba2',
'C:\\Users\\Estefanía Telis\\Documents\\Prueba\\prueba3' ];

describe ('isPathAbsolute', () => {
  it('Debería ser true para ruta absoluta', () => {
    expect(isPathAbsolute('C:/Users/Estefanía Telis/Documents/GitHub/LIM009-fe-md-links')).toBeTruthy();
  });

  it('Debería retornar una ruta absoluta cuando el argumento es una ruta relativa', () => {
    expect(isPathAbsolute('README.md')).toBe("C:\\Users\\Estefanía Telis\\Documents\\GitHub\\LIM009-fe-md-links\\README.md");
  });
});

describe ('isPathAFile', () => {
  test('Debería ser true para archivo', () => {
    return isPathAFile('C:/Users/Estefanía Telis/Documents/GitHub/LIM009-Cipher/README.md').then((result) => {
      expect(result).toEqual(true);
    });
  });

  test('Debería ser false para carpeta', () => {
    return isPathAFile('C:/Users/Estefanía Telis/Documents/GitHub/LIM009-Cipher').then((result) => {
      expect(result).toEqual(false);
    });
  });

  test('Debería arrojar un error', () => {
    return isPathAFile('C:/User/Estefanía Telis/Documents/Prueba').catch((result) => {
      expect(result).toBe('ENOENT');
    });
  });
});

describe('readDirectorySync', () => {
  it('Debería darme un array de rutas absolutas con los elementos de la carpeta', () => {
    expect(readDirectorySync('C:/Users/Estefanía Telis/Documents/Prueba')).toEqual(array2);
  });
});

describe ('pathExtName', () => {
  it('Debería crear un array con la ruta del archivo con extensión .md', () => {
    expect(pathExtName('C:/Users/Estefanía Telis/Documents/GitHub/LIM009-Cipher/README.md')).toEqual(true)
  });
  it('Debería arrojar un error cuando el archivo no es .md', () => {
    expect(pathExtName('C:/Users/Estefanía Telis/Documents/GitHub/LIM009-Cipher/README.html')).toBe(false)
  })
});

describe('readFilesSync', () => {
  it('Debería leer el contenido del archivo markdown', () => {
    expect(readFilesSync('C://Users//Estefanía Telis//Documents//Prueba//filereadme1.md')).toBe('Using VanillaJS, HTML and CSS, **AREA 51 CIPHER** is a web application created to provide security to those who work in the Tech Area when they share information.')
  })
})

// describe('readDirectory', () => {
//   test('Debería ser ENOTDIR cuando la ruta no es de archivo', () => {
//     return readDirectory('C:/Users/Estefanía Telis/Documents/GitHub/LIM009-Cipher/README.md').catch((result) => {
//       expect(result).toBe('ENOTDIR');
//     });
//   });
//   test('Debería retornar un array de nombres de elemntos de la carpeta', () => {
//     return readDirectory('C:/Users/Estefanía Telis/Documents/Prueba').then((result) => {
//       expect(result).toEqual(array1);
//     });
//   });
// });

// describe('getMdFilesPaths', () => {
//   it('Debería ser un array de archivos markdown', () => {
//     expect(getMdFilesPaths('C:/Users/Estefanía Telis/Documents/Prueba', array1)).toEqual(array2);
//   });
// });