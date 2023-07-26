import fs from 'fs';
import chalk from 'chalk';
import {
  convertAbsolutePath,
  fileMd,
  getLinks,
  isDirectory,
  processDirectory,
  validateLinks,
} from './function.js';

export const mdLinks = (path, options = { validate: false }) => {
  return new Promise((resolve, reject) => {
    // Verificar si existe la ruta
    if (fs.existsSync(path)) {
      // Convertirla en absoluta
      const absolutePath = convertAbsolutePath(path);
      let arrayFilesMd = [];
      // Verificar si es un directorio y procesar el contenido
      isDirectory(absolutePath)
        .then((result) => {
          if (result) {
            arrayFilesMd = processDirectory(absolutePath);
          } else {
            arrayFilesMd = fileMd(absolutePath);
          }
          // array de promesas para cada ruta usando map
          const promises = arrayFilesMd.map((path) => getLinks(path));
          // se ejecutan todas las promesas
          Promise.all(promises).then((results) => {
            const allresults = results.flat();
            if (options.validate === true) {
              const checkLinks = validateLinks(allresults);
              console.log(chalk.bgGray('Enlaces Validados'));
              resolve(checkLinks);
            } else {
              console.log(chalk.bgGray('Enlaces Encontrados'));
              resolve(allresults);
            }
          });
        })
        .catch(console.error); // cualquier error que ocurra en isDirectory()
    } else {
      reject('La ruta no existe');
    }
  });
};

// Pruebas en terminal
/*mdLinks('file2.md', { validate: true })
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });
*/
