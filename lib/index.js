"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLinksObject = exports.validateLinks = exports.readAllDirectory = exports.markdownLinkExtractor = exports.readFilesSync = exports.isFileMd = exports.isPathAFile = exports.isPathAbsolute = exports.rFileSync = exports.readDirSync = exports.fileExtName = exports.fileStatSync = void 0;

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _marked = _interopRequireDefault(require("marked"));

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// NODE PATH/FS
const fileStatSync = _fs.default.statSync;
exports.fileStatSync = fileStatSync;
const fileExtName = _path.default.extname;
exports.fileExtName = fileExtName;
const readDirSync = _fs.default.readdirSync;
exports.readDirSync = readDirSync;
const rFileSync = _fs.default.readFileSync; // FUNCTIONS

exports.rFileSync = rFileSync;

const isPathAbsolute = route => {
  let absolutePath = _path.default.isAbsolute(route);

  if (absolutePath) {
    return absolutePath;
  } else {
    return _path.default.resolve(route);
  }
}; // ES ARCHIVO - SÍNCRONO


exports.isPathAbsolute = isPathAbsolute;

const isPathAFile = route => {
  let isItFile = fileStatSync(route);
  return isItFile.isFile();
}; // OBTENER SÓLO LOS ARCHIVOS CON EXTENSIÓN .MD


exports.isPathAFile = isPathAFile;

const isFileMd = route => {
  let extName = fileExtName(route).toLowerCase() === '.md'; //.MD

  return extName;
};

exports.isFileMd = isFileMd;

const readFilesSync = route => {
  let alreadyReadFile = rFileSync(route, 'utf8');
  return alreadyReadFile;
};

exports.readFilesSync = readFilesSync;

const markdownLinkExtractor = (markdown, route) => {
  let links = [];
  let renderer = new _marked.default.Renderer();

  renderer.link = function (href, title, text) {
    links.push({
      href: href,
      path: route,
      text: text.substr(0, 50)
    });
  };

  (0, _marked.default)(markdown, {
    renderer: renderer
  });
  return links;
}; // LEER TODOS LOS ARCHIVOS DE UNA CARPETA


exports.markdownLinkExtractor = markdownLinkExtractor;

const readAllDirectory = route => {
  let arrDirectory = [];

  if (isPathAFile(route)) {
    if (isFileMd(route)) {
      arrDirectory.push(route);
    }
  } else {
    let folder = readDirSync(route);
    folder.forEach(element => {
      let arrFolder = readAllDirectory(_path.default.join(route, element));
      arrDirectory = arrDirectory.concat(arrFolder);
    });
  }

  ;
  return arrDirectory;
};

exports.readAllDirectory = readAllDirectory;

const validateLinks = array => {
  let urlMd = array.map(key => {
    return (0, _nodeFetch.default)(key.href).then(res => {
      if (res.status > 199 && res.status < 400) {
        key.status = res.status;
        key.statusText = res.statusText;
        return key;
      } else {
        key.status = res.status;
        key.statusText = res.statusText;
        return key;
      }
    }); // .catch(() => {
    //   key.status = 'Fail'
    //   key.statusText = 'Fail'
    //   return key
    // })
  });
  return Promise.all(urlMd);
};

exports.validateLinks = validateLinks;

const getLinksObject = route => {
  const result = readAllDirectory(route).map(element => {
    let mdLinks = markdownLinkExtractor(readFilesSync(element), element);
    return mdLinks;
  });
  return [].concat(...result);
};

exports.getLinksObject = getLinksObject;