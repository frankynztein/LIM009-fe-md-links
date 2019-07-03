import { validateLinks, getLinksObject } from "./index.js";

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

export const totalUniqueElements = (array) => {
  let totalElements = array.map(element => {
    return element.href
  });
  const uniqueElements = totalElements.filter((item,index,arr) => {
    return arr.indexOf(item) === index;
  });
  return `Total: ${totalElements.length} \nUnique: ${uniqueElements.length}`
};

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