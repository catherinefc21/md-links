"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertAbsolutePath = void 0;
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// convertir en ruta absoluta
const convertAbsolutePath = rout => {
  if (!_path.default.isAbsolute(rout)) {
    return _path.default.resolve(rout);
  }
};
exports.convertAbsolutePath = convertAbsolutePath;
console.log(convertAbsolutePath('prueba/file1.md'));

// obtener archivos del directorio
getFilesMd = routDirectory => {
  const files = _fs.default.readdirSync(routDirectory);
  return files.filter(file => _path.default.extname(file) === '.md');
};
// obtener los links de los archivos
getMdLinks = routfile => {
  const links = [];
  const fileExtension = _path.default.extname(routfile);
  if (fileExtension === '.md') {
    _fs.default.readdirSync(fileExtension);
    links.push(links);
  }
  return links;
};