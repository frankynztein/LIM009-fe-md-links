import { readFileSync } from 'fs';

const path = require('path');
const fs = require('fs');

// NODE PATH/FS
export const fileStat = fs.stat;
export const fileExtName = path.extname;
export const readDirSync = fs.readdirSync;
export const rFileSync = fs.readFileSync;


let ruta1 = 'C:/Users/Estefanía Telis/Documents/GitHub/LIM009-fe-md-links';
let ruta2 = 'C:/Users/Estefanía Telis/Documents/GitHub/LIM009-Cipher/README.md';
let ruta3 = 'src/demo_path.js';
let ruta4 = 'C:/Users/Estefanía Telis/Documents/Prueba';
let ruta5 = 'C:/User/Estefanía Telis/Documents/Prueba';
let ruta6 = 'C:/Users/Estefanía Telis/Documents/GitHub/LIM009-Cipher/README.html';
let ruta7 = 'C://Users//Estefanía Telis//Documents//Prueba//filereadme1.md';
let array1 = ['C://Users//Estefanía Telis//Documents//Prueba//filereadme1.md',
'C://Users//Estefanía Telis//Documents//Prueba//filereadme2.md'];

export const isPathAbsolute = (route) => {
  let absolutePath = path.isAbsolute(route);  
  if (absolutePath) {
    // console.log('es absoluto', absolutePath);
    return absolutePath;
  } else {
    // console.log('es relativo', path.resolve(route));
    return path.resolve(route);
  }
};

// isPathAbsolute(ruta1);
// isPathAbsolute(ruta3);

// export const validatePath = (path) => {
//   fs.stat(path, (err, data) => {
//     if(err) {
//       console.log(err);
//       console.log('Ruta inválida.');
//     } else {
//       console.log('Ruta válida.');
//       console.log(data.isFile());
      
//       return data.isFile();
//     }
//   });
// };

// validatePath(ruta2);
// console.log(validatePath(ruta2));

// validatePath(ruta3);

export const isPathAFile = (route) => {
  return new Promise ((resolve, rejection) => {
    fileStat(route, (err, data) => {
      if (err) {
        rejection(err.code);        
      } else {
        resolve(data.isFile());
      };
    })
  })
};

// isPathAFile(ruta1);
// isPathAFile(ruta2);
// isPathAFile(ruta3);
// isPathAFile(ruta5);

// isPathAFile(ruta2).then(result => console.log(result));
// .catch(err => console.log(err));


// export const isPathDirectory = (path) => {
//   fs.stat(path, (err, data) => {
//     if (err) {
//       console.log(err);
//     } else if (data.isDirectory() === true) {
//       console.log('Es una carpeta');  
//     };
//   });
// };

// isPathDirectory(ruta1);
// isPathDirectory(ruta2);

// OBTENER SÓLO LOS ARCHIVOS CON EXTENSIÓN .MD
export const pathExtName = (route) => {
  let extName = fileExtName(route) === '.md'
  return extName;
};

// pathExtName(ruta2);
// console.log('pathextname ', pathExtName(ruta2));

// export const pathExtName = (route) => {
//   let extName = fileExtName(route);
//   let arrMdFiles = [];
//   if (extName === '.md') {
//     arrMdFiles.push(route);
//   }
//    return arrMdFiles;
// };

// pathExtName(ruta2);
// console.log('pathextname ', pathExtName(ruta2));

// CUANDO LA RUTA ES UN ARCHIVO - ASÍNCRONO
// export const readDirectory = (route) => {
//   return new Promise((resolve, rejection) => {
//     readDir(route, (err, file) => {
//       if (err) {
//         rejection(err.code);        
//       } else {
//         resolve(file);
//       };
//     });
//   });
// };

// readDirectory(ruta4).then(result => {  
//   getMdFilesPaths(ruta4, result);
//   console.log('getMdFilesPaths', getMdFilesPaths(ruta4, result));
// });

// LEER UNA CARPETA - SÍNCRONO
export const readDirectorySync = (route) => {
  let alreadyReadDir = readDirSync(route);
  let arrayDir = [];
  alreadyReadDir.forEach((element) => {
    let absPathsDir = path.join(route, element);
    arrayDir.push(absPathsDir);
  });
  return arrayDir
};

readDirectorySync(ruta4);

// LEER ARCHIVO - SÍNCRONO
export const readFilesSync = (route) => {
    let alreadyReadFile = rFileSync(route, 'utf8');
    return alreadyReadFile
};

readFilesSync(ruta7);


// OBTENER RUTAS DE ARCHIVOS .MD EN CARPETAS (LUEGO DE readDirectory)
// export const getMdFilesPaths = (route, array) => {
//   let directoryFiles = array;
//   let arrDirectoryAbsolutePaths = [];
//   let arrMdFilesAbsolutePaths = []; 
//   directoryFiles.forEach((fileData) => {
//     let directoryAbsolutePath = path.join(route, fileData);
//     arrDirectoryAbsolutePaths.push(directoryAbsolutePath);
//     return arrDirectoryAbsolutePaths;
//   });
//   arrDirectoryAbsolutePaths.forEach((route) => {        
//     if (path.extname(route) === '.md') {
//       arrMdFilesAbsolutePaths.push(route);
//     };
//   });
//   return arrMdFilesAbsolutePaths;
// };


// LEYENDO ARCHIVO
// export const readingFiles = (array) => {
//   let filesArray = array;
//   console.log('array', array);
  
//   filesArray.forEach((fileData) => {    
//     let alreadyReadFiles = readFiles(fileData, 'utf8', (err, files) => {
//       if (err) {
//         console.log(err.code);
//       } else {
//         console.log('filedata', fileData);
//       };
      
//     });
//   });
  // readFiles(array, 'utf8', (err, data) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     // console.log(data);
  //     const regularExp = //;
  //     console.log(regularExp.exec(data));
      
  //   }
  // });
// };

// console.log('readingFiles', readingFiles(array1));

