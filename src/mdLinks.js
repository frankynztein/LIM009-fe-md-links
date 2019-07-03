import path from "path";
import { validateLinks, getLinksObject } from "./index.js";

let arrayMdLinks = [ {
 href: 'https://codeburst.io/javascript-in-3-minutes-es-2015-let-const-876cda7bd7e7',
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
 text: 'GitHub 404' },
 { href: 'https://github.com/frankynztein/c',
 path: 'C:/Users/Estefanía Telis/Documents/ProyectoNode',
 text: 'GitHub 404' }]

let arrayValidate = [{
  href: 'https://codeburst.io/javascript-in-3-minutes-es-2015-let-const-876cda7bd7e7',
  path: 'C:/Users/Estefanía Telis/Documents/ProyectoNode',
  text: 'JavaScript in 3 Minutes: ES 2015 — let &amp; const',
  status: 200,
  statusText: 'OK' },
{ href: 'https://twitter.com/frankynztein/lists/a',
  path: 'C:/Users/Estefanía Telis/Documents/ProyectoNode',
  text: 'Twitter page doesn&#39;t exist',
  status: 404,
  statusText: 'Not Found' },
{ href: 'https://twiter.com/',
  path: 'C:/Users/Estefanía Telis/Documents/ProyectoNode',
  text: 'Este enlace no existe',
  status: 'Fail',
  statusText: 'Fail' },
{ href: 'https://www.youtube.com/watch?v=zT5yR2E-GGU',
  path: 'C:/Users/Estefanía Telis/Documents/ProyectoNode',
  text: 'YouTube Bien',
  status: 200,
  statusText: 'OK' },
{ href: 'https://www.yotuve.com/watch?v=zT5yR2E-GGU',
  path: 'C:/Users/Estefanía Telis/Documents/ProyectoNode',
  text: 'YouTube Mal',
  status: 'Fail',
  statusText: 'Fail' },
{ href: 'https://github.com/frankynztein/c',
  path: 'C:/Users/Estefanía Telis/Documents/ProyectoNode',
  text: 'GitHub 404',
  status: 404,
  statusText: 'Not Found' },
{ href: 'https://www.yotuve.com/watch?v=zT5yR2E-GGU',
  path: 'C:/Users/Estefanía Telis/Documents/ProyectoNode',
  text: 'YouTube Mal',
  status: 'Fail',
  statusText: 'Fail' },
{ href: 'https://github.com/frankynztein/c',
  path: 'C:/Users/Estefanía Telis/Documents/ProyectoNode',
  text: 'GitHub 404',
  status: 404,
  statusText: 'Not Found' }]

export const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    try {
      const links = getLinksObject(path)
      if (options && options.validate === true) {
        resolve(validateLinks(links))
      } else {
        resolve(links)
      }
    } catch (error) {
      reject(error)
    }
  });
};

// mdLinks(path.join(process.cwd(), 'fakePath', 'mdFile.md'), { validate : false }).then(res => { console.log('invocando funcion', res);
// }).catch(err => {console.log('err', err);})

// mdLinks('C:/Users/Estefanía Telis/Documents/ProyectoNode/', { validate : true }).then(res => { console.log('invocando funcion', res);
// }).catch(err => {console.log(err);})


export const totalUniqueElements = (array) => {
  let totalElements = array.map(element => {
    return element.href
  });

  const uniqueElements = totalElements.filter((item,index,arr) => {
    
    return arr.indexOf(item) === index;
  });

  return `Total: ${totalElements.length} \nUnique: ${uniqueElements.length}`
};

// console.log('totalUniqueElements', totalUniqueElements(arrayMdLinks));


export const totalUniqueBrokenElements = (array) => {
  let totalElements = array.map(element => {
    return element.href
  });

  const uniqueElements = totalElements.filter((item,index,arr) => {
    return arr.indexOf(item) === index;
  });
  
  const brokenLinks = array.filter(elem => {
    if(elem.statusText === 'Not Found' || elem.statusText === 'Fail') {
      return true
    }
    return false;
  });
  
  return `Total: ${totalElements.length} \nUnique: ${uniqueElements.length} \nBrokenLinks: ${brokenLinks.length}`
};

// console.log('totaluniquebroken', totalUniqueBrokenElements(arrayValidate));