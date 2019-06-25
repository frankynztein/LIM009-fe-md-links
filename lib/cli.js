#!/usr/bin/env node
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mdLinksCli = void 0;

var _mdLinks = require("./mdLinks.js");

// const arguments = process.argv;
const mdLinksCli = (route, option1, option2) => {
  if (route != undefined && option1 === undefined && option2 === undefined) {
    console.log('Sólo ruta ');
    return (0, _mdLinks.mdLinks)(route, {
      validate: false
    }).then(result => {
      let resultArr = result.map(elem => {
        return `${elem.href} - ${elem.path} - ${elem.text}`;
      });
      let finalArr = resultArr.toString().replace(/,/g, '\n');
      return finalArr;
    }).catch(err => console.log(err));
  } else if (route != undefined && option1 === '--validate' && option2 === undefined) {
    console.log(' --validate ');
    return (0, _mdLinks.mdLinks)(route, {
      validate: true
    }).then(result => {
      let resultArr = result.map(elem => {
        return `${elem.href} - ${elem.path} - ${elem.statusText} - ${elem.status} - ${elem.text} `;
      });
      let finalArr = resultArr.toString().replace(/,/g, '\n');
      return finalArr;
    }).catch(err => console.log(err));
  } else if (route != undefined && option1 === '--stats' && option2 === undefined) {
    console.log(' --stats ');
    return (0, _mdLinks.mdLinks)(route, {
      validate: false
    }).then(result => (0, _mdLinks.totalUniqueElements)(result)).catch(err => console.log(err));
  } else if (route != undefined && option1 === '--validate' && option2 === '--stats') {
    console.log('--validate --stats');
    return (0, _mdLinks.mdLinks)(route, {
      validate: true
    }).then(result => (0, _mdLinks.totalUniqueBrokenElements)(result)).catch(err => console.log(err));
  }
};

exports.mdLinksCli = mdLinksCli;
mdLinksCli('C:/Users/Estefanía Telis/Documents/ProyectoNode', undefined, undefined).then(result => console.log(result)).catch(err => console.log(err)); // mdLinksCli('C:/Users/Estefanía Telis/Documents/ProyectoNode', undefined, undefined);