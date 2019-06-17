"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.readFilesSync = exports.readDirectorySync = exports.pathExtName = exports.isPathAFile = exports.isPathAbsolute = exports.rFileSync = exports.readDirSync = exports.fileExtName = exports.fileStat = void 0;

var _fs = require("fs");

var path = require('path');

var fs = require('fs'); // NODE PATH/FS


var fileStat = fs.stat;
exports.fileStat = fileStat;
var fileExtName = path.extname;
exports.fileExtName = fileExtName;
var readDirSync = fs.readdirSync;
exports.readDirSync = readDirSync;
var rFileSync = fs.readFileSync;
exports.rFileSync = rFileSync;
var ruta1 = 'C:/Users/Estefanía Telis/Documents/GitHub/LIM009-fe-md-links';
var ruta2 = 'C:/Users/Estefanía Telis/Documents/GitHub/LIM009-Cipher/README.md';
var ruta3 = 'src/demo_path.js';
var ruta4 = 'C:/Users/Estefanía Telis/Documents/Prueba';
var ruta5 = 'C:/User/Estefanía Telis/Documents/Prueba';
var ruta6 = 'C:/Users/Estefanía Telis/Documents/GitHub/LIM009-Cipher/README.html';
var ruta7 = 'C://Users//Estefanía Telis//Documents//Prueba//filereadme1.md';
var array1 = ['C://Users//Estefanía Telis//Documents//Prueba//filereadme1.md', 'C://Users//Estefanía Telis//Documents//Prueba//filereadme2.md'];

var isPathAbsolute = function isPathAbsolute(route) {
  var absolutePath = path.isAbsolute(route);

  if (absolutePath) {
    // console.log('es absoluto', absolutePath);
    return absolutePath;
  } else {
    // console.log('es relativo', path.resolve(route));
    return path.resolve(route);
  }
}; // isPathAbsolute(ruta1);
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


exports.isPathAbsolute = isPathAbsolute;

var isPathAFile = function isPathAFile(route) {
  return new Promise(function (resolve, rejection) {
    fileStat(route, function (err, data) {
      if (err) {
        rejection(err.code);
      } else {
        resolve(data.isFile());
      }

      ;
    });
  });
}; // isPathAFile(ruta1);
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


exports.isPathAFile = isPathAFile;

var pathExtName = function pathExtName(route) {
  var extName = fileExtName(route) === '.md';
  return extName;
};

exports.pathExtName = pathExtName;
pathExtName(ruta2);
console.log('pathextname ', pathExtName(ruta2)); // export const pathExtName = (route) => {
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

var readDirectorySync = function readDirectorySync(route) {
  var alreadyReadDir = readDirSync(route);
  var arrayDir = [];
  alreadyReadDir.forEach(function (element) {
    var absPathsDir = path.join(route, element);
    arrayDir.push(absPathsDir);
  });
  return arrayDir;
};

exports.readDirectorySync = readDirectorySync;
readDirectorySync(ruta4); // LEER ARCHIVO - SÍNCRONO

var readFilesSync = function readFilesSync(route) {
  var alreadyReadFile = rFileSync(route, 'utf8');
  return alreadyReadFile;
};

exports.readFilesSync = readFilesSync;
readFilesSync(ruta7); // OBTENER RUTAS DE ARCHIVOS .MD EN CARPETAS (LUEGO DE readDirectory)
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