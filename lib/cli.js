"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mdLinksCli = void 0;

var _mdLinks = require("./mdLinks.js");

const mdLinksCli = (route, option1, option2) => {
  if (route != undefined && option1 === undefined && option2 === undefined) {
    return (0, _mdLinks.mdLinks)(route, {
      validate: false
    }).then(result => {
      let resultArr = result.map(elem => {
        return `${elem.href} - ${elem.path} - ${elem.text}`;
      });
      let finalArr = resultArr.toString().replace(/,/g, '\n');
      return finalArr;
    });
  } else if (route != undefined && option1 === '--validate' && option2 === undefined) {
    return (0, _mdLinks.mdLinks)(route, {
      validate: true
    }).then(result => {
      let resultArr = result.map(elem => {
        return `${elem.href} - ${elem.path} - ${elem.statusText} - ${elem.status} - ${elem.text}`;
      });
      let finalArr = resultArr.toString().replace(/,/g, '\n');
      return finalArr;
    });
  } else if (route != undefined && option1 === '--stats' && option2 === undefined) {
    return (0, _mdLinks.mdLinks)(route, {
      validate: false
    }).then(result => (0, _mdLinks.totalUniqueElements)(result));
  } else if (route != undefined && option1 === '--validate' && option2 === '--stats') {
    return (0, _mdLinks.mdLinks)(route, {
      validate: true
    }).then(result => (0, _mdLinks.totalUniqueBrokenElements)(result));
  }
};

exports.mdLinksCli = mdLinksCli;