"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mdLinks = void 0;
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var _function = _interopRequireDefault(require("../lib/function.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const mdLinks = (rout, options) => {
  return new Promise((resolve, reject) => {
    // Verificar si existe la ruta convertirla en absoluta
    if (!_fs.default.existsSync(rout)) {
      reject('La ruta no existe');
      return;
    }
    // convertirla en absoluta
    const absolutePath = (0, _function.default)(rout);

    // Si es un archivo, verificar si es .md
    if (_fs.default.statSync(absolutePath).isFile() && _path.default.extname(absolutePath) === ".md") {
      _fs.default.readFile(absolutePath, 'utf8', (err, content) => {
        if (err) {
          reject(err);
        } else {
          resolve(content);
        }
      });
      return;
    }

    // Si es un directorio, traer los archivos y filtrar los que son .md
    if (_fs.default.statSync(absolutePath).isDirectory()) {
      const files = _fs.default.readdirSync(absolutePath);
      console.log(files);
      const mdFiles = files.filter(file => _path.default.extname(file) === ".md");
      console.log(mdFiles);
      const contentArray = mdFiles.map(file => {
        const filePath = _path.default.join(absolutePath, file); // unir las rutas 
        console.log(filePath);
        return _fs.default.readFileSync(filePath, 'utf8');
      });
      resolve(contentArray);
      return;
    }
    reject('La ruta no es un archivo ni un directorio válido');
    // Si la options es True se deben validar y traer un array 
  });
};
exports.mdLinks = mdLinks;
mdLinks('prueba').then(result => {
  console.log(result);
}).catch(error => {
  console.error(error);
});