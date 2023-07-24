import fs from "fs";
import chalk from "chalk";
import {
  convertAbsolutePath,
  fileMd,
  getLinks,
  isDirectory,
  processDirectory,
  validateLinks,
} from "./lib/function.js";

export const mdLinks = (route, options = { validate: false }) => {
  return new Promise((resolve, reject) => {
    // Verificar si existe la ruta
    if (fs.existsSync(route)) {
      // Convertirla en absoluta
      const absolutePath = convertAbsolutePath(route);
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
          const promises = arrayFilesMd.map((route) => getLinks(route));
          // se ejecutan todas las promesas
          Promise.all(promises).then((results) => {
            const allresults = results.flat();
            if (options.validate === true) {
              const checkLinks = validateLinks(allresults);
              resolve(checkLinks);
              console.log(
                chalk.italic.bold.magenta.bgBlue(
                  "Enlaces validados (Validate: True)"
                )
              );
            } else {
              resolve(allresults);
              console.log(
                chalk.italic.bold.magenta.bgBlue(
                  "Enlaces disponibles (Validate: False)"
                )
              );
            }
          });
        })
        .catch(console.error); // cualquier error que ocurra en isDirectory()
    } else {
      reject("La ruta no existe");
    }
  });
};

// Pruebas en terminal
/*mdLinks("prueba")
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });*/
