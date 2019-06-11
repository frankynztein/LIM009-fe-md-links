const path = require('path');
const fs = require('fs');

// let content = fs.readFile('Estefanía%20Telis/Documents/GitHub/', function (err, content) {
//   console.log(content);
//   let lines =  content.toString().split('\n').length -1;
  
// });

let ruta1 = 'C:/Users/Estefanía Telis/Documents/GitHub/LIM009-fe-md-links';
let ruta2 = 'C:/Users/Estefanía Telis/Documents/GitHub/LIM009-Cipher/README.md';
// let ruta3 = 'src/demo_path.js';

export const isPathAbsolute = (ruta) => {
  let absolutePath = path.isAbsolute(ruta);
  if (absolutePath === true) {
    // console.log('es absoluto');
  } else {
    // console.log('es relativo');
    path.resolve(ruta);
    // console.log(path.resolve(ruta));
  }
};

isPathAbsolute(ruta1);
isPathAbsolute(ruta2);
// isPathAbsolute(ruta3);

export const validatePath = (path) => {
  fs.access(path, (err) => {
    if(err) {
      console.log('Ruta inválida.');
    } else {
      console.log('Ruta válida.'); 
    }
    // console.log(`${err ? 'does not exist' : 'exists'}`);
  });
};

// validatePath(ruta1);
// validatePath(ruta1);

export const isPathAFile = (path) => {
  fs.stat(path, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log('¿Es un archivo? ' + data.isFile());  
    };
  });
};

// isPathAFile(ruta1);
// isPathAFile(ruta2);
// isPathAFile(ruta3);

export const isPathDirectory = (path) => {
  fs.stat(path, (err, data) => {
    if (err) {
      console.log(err);
    } else if (data.isDirectory() === true) {
      console.log('Es una carpeta');  
    };
  });
};

// isPathDirectory(ruta1);
// isPathDirectory(ruta2);

export const pathExtName = (ruta) => {
  let extName = path.extname(ruta);
  let arrMdFiles = [];
  if (extName === '.md') {
    arrMdFiles.push(ruta);
  }
  console.log('arrmdfiles ' + arrMdFiles);
  
};

// pathExtName(ruta1);
// pathExtName(ruta2);

// CUANDO LA RUTA ES UN ARCHIVO
export const readDirectory = (route) => {
  fs.readdir(route, (err, file) => {
    if (err) {
      console.log(err);
    } else {
      let directoryFiles = file;
      // console.log(directoryFiles);
      let arrDirectoryAbsolutePaths = []; 
      directoryFiles.forEach((fileData) => {
        let directoryAbsolutePath = path.join(route, fileData);
        // console.log(directoryAbsolutePath);
        arrDirectoryAbsolutePaths.push(directoryAbsolutePath);
      });
      console.log(arrDirectoryAbsolutePaths);

    }
  });
};

readDirectory(ruta1);
// readDirectory(ruta2);