"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.readDirectory = exports.pathExtName = exports.isPathDirectory = exports.isPathAFile = exports.validatePath = exports.isPathAbsolute = void 0;

var path = require('path');

var fs = require('fs'); // let content = fs.readFile('Estefanía%20Telis/Documents/GitHub/', function (err, content) {
//   console.log(content);
//   let lines =  content.toString().split('\n').length -1;
// });


var ruta1 = 'C:/Users/Estefanía Telis/Documents/GitHub/LIM009-fe-md-links';
var ruta2 = 'C:/Users/Estefanía Telis/Documents/GitHub/LIM009-Cipher/README.md'; // let ruta3 = 'src/demo_path.js';

var isPathAbsolute = function isPathAbsolute(ruta) {
  var absolutePath = path.isAbsolute(ruta);

  if (absolutePath === true) {// console.log('es absoluto');
  } else {
    // console.log('es relativo');
    path.resolve(ruta); // console.log(path.resolve(ruta));
  }
};

exports.isPathAbsolute = isPathAbsolute;
isPathAbsolute(ruta1);
isPathAbsolute(ruta2); // isPathAbsolute(ruta3);

var validatePath = function validatePath(path) {
  fs.access(path, function (err) {
    if (err) {
      console.log('Ruta inválida.');
    } else {
      console.log('Ruta válida.');
    } // console.log(`${err ? 'does not exist' : 'exists'}`);

  });
}; // validatePath(ruta1);
// validatePath(ruta1);


exports.validatePath = validatePath;

var isPathAFile = function isPathAFile(path) {
  fs.stat(path, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log('¿Es un archivo? ' + data.isFile());
    }

    ;
  });
}; // isPathAFile(ruta1);
// isPathAFile(ruta2);
// isPathAFile(ruta3);


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

var pathExtName = function pathExtName(ruta) {
  var extName = path.extname(ruta);
  var arrMdFiles = [];

  if (extName === '.md') {
    arrMdFiles.push(ruta);
  }

  console.log('arrmdfiles ' + arrMdFiles);
}; // pathExtName(ruta1);
// pathExtName(ruta2);
// CUANDO LA RUTA ES UN ARCHIVO


exports.pathExtName = pathExtName;

var readDirectory = function readDirectory(route) {
  fs.readdir(route, function (err, file) {
    if (err) {
      console.log(err);
    } else {
      var directoryFiles = file; // console.log(directoryFiles);

      var arrDirectoryAbsolutePaths = [];
      directoryFiles.forEach(function (fileData) {
        var directoryAbsolutePath = path.join(route, fileData); // console.log(directoryAbsolutePath);

        arrDirectoryAbsolutePaths.push(directoryAbsolutePath);
      });
      console.log(arrDirectoryAbsolutePaths);
    }
  });
};

exports.readDirectory = readDirectory;
readDirectory(ruta1); // readDirectory(ruta2);