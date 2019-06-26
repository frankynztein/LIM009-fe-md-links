import { mdLinks, totalUniqueElements, totalUniqueBrokenElements } from "./mdLinks.js";


export const mdLinksCli = (route, option1, option2) => {
  if (route != undefined && option1 === undefined && option2 === undefined) {
    // console.log('Sólo ruta ');
    return mdLinks(route, { validate: false })
    .then(result => {
      let resultArr = result.map(elem => {
        return `${elem.href} - ${elem.path} - ${elem.text}`
      });
      let finalArr = resultArr.toString().replace(/,/g,'\n');
        return finalArr
    })
    // .catch(err => console.log(err))
  } else if (route != undefined && option1 === '--validate' && option2 === undefined) {
    // console.log(' --validate ');
      return mdLinks(route, { validate: true })
      .then(result => {
        let resultArr = result.map(elem => {
          return `${elem.href} - ${elem.path} - ${elem.statusText} - ${elem.status} - ${elem.text}`
        });
        let finalArr = resultArr.toString().replace(/,/g,'\n');
          return finalArr
    })
      // .catch(err => console.log(err))
  } else if (route != undefined && option1 === '--stats' && option2 === undefined) {
    // console.log(' --stats ');
      return mdLinks(route, { validate: false }).then(result => totalUniqueElements(result)).catch(err => console.log(err))
  } else if (route != undefined && option1 === '--validate' && option2 === '--stats') {
    // console.log('--validate --stats');
      return mdLinks(route, { validate: true }).then(result => totalUniqueBrokenElements(result)).catch(err => console.log(err))
  }
};

// mdLinksCli('C:/Users/Estefanía Telis/Documents/ProyectoNode', '--validate', undefined).then(result => console.log(result))
// .catch(err => console.log(err))

// mdLinksCli('C:/Users/Estefanía Telis/Documents/ProyectoNode', undefined, undefined);
