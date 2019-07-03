"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.totalUniqueBrokenElements = exports.totalUniqueElements = exports.mdLinks = void 0;

var _index = require("./index.js");

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    try {
      const links = (0, _index.getLinksObject)(path);

      if (options && options.validate === true) {
        resolve((0, _index.validateLinks)(links));
      } else {
        resolve(links);
      }
    } catch (error) {
      reject(error);
    }
  });
};

exports.mdLinks = mdLinks;

const totalUniqueElements = array => {
  let totalElements = array.map(element => {
    return element.href;
  });
  const uniqueElements = totalElements.filter((item, index, arr) => {
    return arr.indexOf(item) === index;
  });
  return `Total: ${totalElements.length} \nUnique: ${uniqueElements.length}`;
};

exports.totalUniqueElements = totalUniqueElements;

const totalUniqueBrokenElements = array => {
  let totalElements = array.map(element => {
    return element.href;
  });
  const uniqueElements = totalElements.filter((item, index, arr) => {
    return arr.indexOf(item) === index;
  });
  const brokenLinks = array.filter(elem => {
    if (elem.statusText === 'Not Found' || elem.statusText === 'Fail') {
      return true;
    }

    return false;
  });
  return `Total: ${totalElements.length} \nUnique: ${uniqueElements.length} \nBrokenLinks: ${brokenLinks.length}`;
};

exports.totalUniqueBrokenElements = totalUniqueBrokenElements;