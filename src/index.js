import path from 'path';
import fs from 'fs';
import marked from 'marked';
import fetch from 'node-fetch';

// NODE PATH/FS
export const fileStatSync = fs.statSync;
export const fileExtName = path.extname;
export const readDirSync = fs.readdirSync;
export const rFileSync = fs.readFileSync;

// FUNCTIONS
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
export const isFileMd = (route) => {
  let extName = fileExtName(route).toLowerCase() === '.md' //.MD
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
    if (isFileMd(route)) {
      arrDirectory.push(route);
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

export const validateLinks = (array) => {
  let urlMd = array.map(key => {
    return fetch(key.href)
    .then(res => {
      if(res.status > 199 && res.status < 400) {
        key.status = res.status
        key.statusText = res.statusText
        return key
      } else {
        key.status = res.status
        key.statusText = res.statusText
        return key
        }
    })
    // .catch(() => {
    //   key.status = 'Fail'
    //   key.statusText = 'Fail'
    //   return key
    // })
  });
  return Promise.all(urlMd)    
};

export const getLinksObject = (route) => {
  const result = readAllDirectory(route).map(element => {
    let mdLinks = markdownLinkExtractor(readFilesSync(element), element);
    return mdLinks
  });
  return [].concat(...result)
};