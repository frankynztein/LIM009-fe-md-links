const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');
const marked = require('marked');

// NODE PATH/FS
export const fileStatSync = fs.statSync;
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
let ruta8 = 'C:/Users/Estefanía Telis/Documents/Prueba2/prueba2.md';
let ruta9 = 'C:/Users/Estefanía Telis/Documents/ProyectoNode';
let ruta10 = 'C:/Users/Estefanía Telis/Documents/ProyectoNode/tres-enlaces.md';
let array1 = [ 'C:/Users/Estefanía Telis/Documents/Prueba/filereadme1.md',
'C:/Users/Estefanía Telis/Documents/Prueba/filereadme2.md',
'C:/Users/Estefanía Telis/Documents/Prueba/prueba1/prueba1-2/prueba1-2.md' ];
let array2 = [ {
href: 'https://google.com/c',
path: 'C:/Users/Estefanía Telis/Documents/Prueba',
text: 'Prueba1-2' } ]
let array3 = [ {
  href:
  'https://drive.google.com/drive/folders/1802L6TP0h8Kr1qmDMhn2ZvQaK7cuVpXr?usp=sharing',
 path:
  'C:/Users/Estefanía Telis/Documents/GitHub/LIM009-Cipher/README.md',
 text: 'You can listen the interviews HERE' },
{ href: 'https://frankynztein.github.io/LIM009-Cipher/src',
 path:
  'C:/Users/Estefanía Telis/Documents/GitHub/LIM009-Cipher/README.md',
 text: 'Try the app HERE.' } ]
 let array4 = [ { href:
  'https://codeburst.io/javascript-in-3-minutes-es-2015-let-const-876cda7bd7e7',
 path: 'C:/Users/Estefanía Telis/Documents/ProyectoNode',
 text: 'JavaScript in 3 Minutes: ES 2015 — let &amp; const' },
{ href: 'https://twitter.com/frankynztein/lists/a',
 path: 'C:/Users/Estefanía Telis/Documents/ProyectoNode',
 text: 'Twitter page doesn&#39;t exist' },
{ href: 'https://twiter.com/',
 path: 'C:/Users/Estefanía Telis/Documents/ProyectoNode',
 text: 'Este enlace no existe' },
{ href: 'https://www.youtube.com/watch?v=zT5yR2E-GGU',
 path: 'C:/Users/Estefanía Telis/Documents/ProyectoNode',
 text: 'YouTube Bien' },
{ href: 'https://www.yotuve.com/watch?v=zT5yR2E-GGU',
 path: 'C:/Users/Estefanía Telis/Documents/ProyectoNode',
 text: 'YouTube Mal' },
{ href: 'https://github.com/frankynztein/c',
 path: 'C:/Users/Estefanía Telis/Documents/ProyectoNode',
 text: 'GitHub 404' } ]

export const isPathAbsolute = (route) => {
  let absolutePath = path.isAbsolute(route);  
  if (absolutePath) {
    return absolutePath;
  } else {
    return path.resolve(route);
  }
};

// ES ARCHIVO - SÍNCRONO
export const isPathAFile = (route) => {
    let isItFile = fileStatSync(route);    
    return isItFile.isFile()
};

// OBTENER SÓLO LOS ARCHIVOS CON EXTENSIÓN .MD
export const pathExtName = (route) => {
  let extName = fileExtName(route) === '.md'
  return extName;
};

export const readFilesSync = (route) => {
  let alreadyReadFile = rFileSync(route, 'utf8');  
  return alreadyReadFile;
};

export const markdownLinkExtractor = (markdown, route) => {
  let links = [];
  let renderer = new marked.Renderer();
  renderer.link = function (href, title, text) {
    links.push({
      href: href,
      path: route,
      text: text.substr(0,50)});
  };
  marked(markdown, { renderer: renderer });
  return links
};

// LEER TODOS LOS ARCHIVOS DE UNA CARPETA
export const readAllDirectory = (route) => {
  let arrDirectory = [];
  if (isPathAFile(route)) {
    if (pathExtName(route)) {
      arrDirectory.push(route);
    } else {
    }
  } else {
    let folder = readDirSync(route);
    folder.forEach((element) => {
      let arrFolder = readAllDirectory(path.join(route, element));
      arrDirectory = arrDirectory.concat(arrFolder);
    });
  };
  return arrDirectory
};

let array5 = [{
  href: 'https://twiter.com/',
  path: 'C:/Users/Estefanía Telis/Documents/ProyectoNode',
  text: 'Este enlace no existe'}];

export const validateLinks = (array) => {
  let urlMd = array.map(key => {
    return fetch(key.href)
    .then(res => {
      if(res.status > 199 && res.status < 300) {
        key.status = res.status
        key.statusText = res.statusText
        return key
      } else {
        key.status = res.status
        key.statusText = res.statusText
        return key
        }
    })
    .catch(() => {
      key.status = 'Fail'
      key.statusText = 'Fail'
      return key
    })
  });
  return Promise.all(urlMd)    
};

export const threePropertiesObject = (route) => {
  const result = readAllDirectory(route).map(element => {
    
    let mdLinks = markdownLinkExtractor(readFilesSync(element), element);
    return mdLinks
  })
  
  return [].concat(...result)
};