"use strict";

var _fs = _interopRequireDefault(require("fs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const leerArchivo = () => {
  _fs.default.readFile('file1.md', 'utf-8', (err, data) => {
    if (err) {
      console.log('error: ', err);
    } else {
      console.log(data);
    }
  });
  console.log(leerArchivo);
};