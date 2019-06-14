const path = require('path');
const fs = require('fs');

// NODE PATH/FS
export const fileStat = fs.stat;
export const fileExtName = path.extname;
export const readDir = fs.readdir;


let ruta1 = 'C:/Users/Estefanía Telis/Documents/GitHub/LIM009-fe-md-links';
let ruta2 = 'C:/Users/Estefanía Telis/Documents/GitHub/LIM009-Cipher/README.md';
let ruta3 = 'src/demo_path.js';
let ruta4 = 'C:/Users/Estefanía Telis/Documents/Prueba';

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

isPathAbsolute(ruta1);
isPathAbsolute(ruta3);

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
        rejection(err);
      } else {
        resolve(data.isFile());
      };
    })
  })
};

// isPathAFile(ruta1);
// isPathAFile(ruta2);
// isPathAFile(ruta3);

// isPathAFile(ruta2).then(result => console.log(result));
// .catch(err => console.log(err));


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

export const pathExtName = (route) => {
  let extName = fileExtName(route);
  let arrMdFiles = [];
  if (extName === '.md') {
    arrMdFiles.push(route);
  }
  // console.log('arrMdFiles= ', arrMdFiles);
  return arrMdFiles;
};

// pathExtName(ruta2);
// console.log('pathextname ', pathExtName(ruta2));

// CUANDO LA RUTA ES UN ARCHIVO
export const readDirectory = (route) => {
  return new Promise((resolve, rejection) => {
    readDir(route, (err, file) => {
      if (err) {
        rejection(err);
      } else {
        // resolve(resolveReadDirectory(file));
        resolve(file);
      };
    });
  });
};

// readDirectory(ruta1);
// readDirectory(ruta2);
readDirectory(ruta4).then(result => {
  result.forEach(f =>{
    // console.log(getMdFilesPaths(f))
  })
});

// readDirectory(ruta4).then(result => result);

// OBTENER RUTAS DE ARCHIVOS .MD EN CARPETAS (LUEGO DE readDirectory)
export const getMdFilesPaths = (result) => {
  let directoryFiles = result;
  // console.log(directoryFiles);
  let arrDirectoryAbsolutePaths = [];
  let arrMdFilesAbsolutePaths = []; 
  directoryFiles.forEach((fileData) => {
    let directoryAbsolutePath = path.join(route, fileData);
    // console.log(directoryAbsolutePath);
    arrDirectoryAbsolutePaths.push(directoryAbsolutePath);
  });
  arrDirectoryAbsolutePaths.forEach((route) => {        
    if (path.extname(route) === '.md') {
      arrMdFilesAbsolutePaths.push(route);
      // console.log(arrMdFilesAbsolutePaths);
      return arrMdFilesAbsolutePaths
    };
  });
};





// LEYENDO ARCHIVO
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
