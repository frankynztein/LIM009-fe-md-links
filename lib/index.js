"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMdFilesPaths = exports.readDirectory = exports.pathExtName = exports.isPathDirectory = exports.isPathAFile = exports.isPathAbsolute = exports.readDir = exports.fileExtName = exports.fileStat = void 0;

var path = require('path');

var fs = require('fs'); // NODE PATH/FS


var fileStat = fs.stat;
exports.fileStat = fileStat;
var fileExtName = path.extname;
exports.fileExtName = fileExtName;
var readDir = fs.readdir;
exports.readDir = readDir;
var ruta1 = 'C:/Users/Estefanía Telis/Documents/GitHub/LIM009-fe-md-links';
var ruta2 = 'C:/Users/Estefanía Telis/Documents/GitHub/LIM009-Cipher/README.md';
var ruta3 = 'src/demo_path.js';
var ruta4 = 'C:/Users/Estefanía Telis/Documents/Prueba';

var isPathAbsolute = function isPathAbsolute(route) {
  var absolutePath = path.isAbsolute(route);

  if (absolutePath === true) {
    console.log('es absoluto', absolutePath);
    return absolutePath;
  } else {
    console.log('es relativo', path.resolve(route));
    return path.resolve(route);
  }
};

exports.isPathAbsolute = isPathAbsolute;
isPathAbsolute(ruta1);
isPathAbsolute(ruta3); // export const validatePath = (path) => {
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

var isPathAFile = function isPathAFile(route) {
  return new Promise(function (resolve, rejection) {
    fileStat(route, function (err, data) {
      if (err) {
        rejection(err);
      } else {
        resolve(data.isFile());
      }

      ;
    });
  });
}; // isPathAFile(ruta1);
// isPathAFile(ruta2);
// isPathAFile(ruta3);
// isPathAFile(ruta2).then(result => console.log(result));
// .catch(err => console.log(err));


exports.isPathAFile = isPathAFile;

var isPathDirectory = function isPathDirectory(path) {
  fs.stat(path, function (err, data) {
    if (err) {
      console.log(err);
    } else if (data.isDirectory() === true) {
      console.log('Es una carpeta');
    }

    ;
  });
}; // isPathDirectory(ruta1);
// isPathDirectory(ruta2);


exports.isPathDirectory = isPathDirectory;

var pathExtName = function pathExtName(route) {
  var extName = fileExtName(route);
  var arrMdFiles = [];

  if (extName === '.md') {
    arrMdFiles.push(route);
  } // console.log('arrMdFiles= ', arrMdFiles);


  return arrMdFiles;
}; // pathExtName(ruta2);
// console.log('pathextname ', pathExtName(ruta2));
// CUANDO LA RUTA ES UN ARCHIVO


exports.pathExtName = pathExtName;

var readDirectory = function readDirectory(route) {
  return new Promise(function (resolve, rejection) {
    readDir(route, function (err, file) {
      if (err) {
        rejection(err);
      } else {
        // resolve(resolveReadDirectory(file));
        resolve(file);
      }

      ;
    });
  });
}; // readDirectory(ruta1);
// readDirectory(ruta2);


exports.readDirectory = readDirectory;
readDirectory(ruta4).then(function (result) {
  result.forEach(function (f) {// console.log(getMdFilesPaths(f))
  });
}); // readDirectory(ruta4).then(result => result);
// OBTENER RUTAS DE ARCHIVOS .MD EN CARPETAS (LUEGO DE readDirectory)

var getMdFilesPaths = function getMdFilesPaths(result) {
  var directoryFiles = result; // console.log(directoryFiles);

  var arrDirectoryAbsolutePaths = [];
  var arrMdFilesAbsolutePaths = [];
  directoryFiles.forEach(function (fileData) {
    var directoryAbsolutePath = path.join(route, fileData); // console.log(directoryAbsolutePath);

    arrDirectoryAbsolutePaths.push(directoryAbsolutePath);
  });
  arrDirectoryAbsolutePaths.forEach(function (route) {
    if (path.extname(route) === '.md') {
      arrMdFilesAbsolutePaths.push(route); // console.log(arrMdFilesAbsolutePaths);

      return arrMdFilesAbsolutePaths;
    }

    ;
  });
}; // LEYENDO ARCHIVO
// export const readingFile = (route) => {
//   fs.readFile(route, 'utf8', (err, data) => {
//     if (err) {
//       console.log(err);
//     } else {
//       // console.log(data);
//       const regularExp = //;
//       console.log(regularExp.exec(data));
//     }
//   });
// };
// readingFile(ruta2);


exports.getMdFilesPaths = getMdFilesPaths;