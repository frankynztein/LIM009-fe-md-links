import { mdLinks, totalUniqueElements, totalUniqueBrokenElements } from "./mdLinks.js";


export const mdLinksCli = (route, option1, option2) => {
  if (route != undefined && option1 === undefined && option2 === undefined) {
    return mdLinks(route, { validate: false })
    .then(result => {
      let resultArr = result.map(elem => {
        return `${elem.href} - ${elem.path} - ${elem.text}`
      });
      let finalArr = resultArr.toString().replace(/,/g,'\n');
        return finalArr
    })
  } else if (route != undefined && option1 === '--validate' && option2 === undefined) {
      return mdLinks(route, { validate: true })
      .then(result => {
        let resultArr = result.map(elem => {
          return `${elem.href} - ${elem.path} - ${elem.statusText} - ${elem.status} - ${elem.text}`
        });
        let finalArr = resultArr.toString().replace(/,/g,'\n');
          return finalArr
    })
  } else if (route != undefined && option1 === '--stats' && option2 === undefined) {
      return mdLinks(route, { validate: false }).then(result => totalUniqueElements(result))
  } else if (route != undefined && option1 === '--validate' && option2 === '--stats') {
      return mdLinks(route, { validate: true }).then(result => totalUniqueBrokenElements(result))
  }
};
