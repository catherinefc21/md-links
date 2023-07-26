"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.existRoute = void 0;
var _fs = _interopRequireDefault(require("fs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// comprobar si la ruta existe
const existRoute = filePath => {
  return new Promise((resolve, reject) => {
    if (_fs.default.existsSync(filePath)) {
      resolve('La ruta existe');
    } else {
      reject('La ruta no existe');
    }
  });
};
// ejemplosss para verificar
exports.existRoute = existRoute;
existRoute('prueba/file1.md').then(() => {
  console.log('La ruta existe');
}).catch(error => {
  console.log('error: ', error);
});