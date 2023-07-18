import fs from "fs";
import path from "path";
import {
  convertAbsolutePath,
  getLinks,
  processDirectory,
  validateLinks,
} from "./lib/function.js";

export const mdLinks = (route, options) => {
  return new Promise((resolve, reject) => {
    // Verificar si existe la ruta
    if (!fs.existsSync(route)) {
      reject("La ruta no existe");
      return;
    }

    // Convertirla en absoluta
    const absolutePath = convertAbsolutePath(route);

    fs.stat(absolutePath, (err, stats) => {
      if (err) {
        reject(err);
        return;
      }

      if (stats.isFile() && path.extname(absolutePath) === ".md") {
        // Si la ruta es un archivo Markdown
        const links = getLinks(absolutePath);
        if (options && options.validate === true) {
          // Si se especifica la opción de validación, obtener y validar los links
          links
            .then((resolvedLinks) => resolve(validateLinks(resolvedLinks)))
            .catch(reject);
        } else {
          // Si no se especifica la opción de validación, solo obtener los links
          links.then(resolve).catch(reject);
        }
      } else if (stats.isDirectory()) {
        // Si la ruta es un directorio
        processDirectory(absolutePath, options).then(resolve).catch(reject);
      } else {
        reject(new Error("La ruta no es un archivo ni un directorio válido"));
      }
    });
  });
};
// Pruebas en terminal
/* mdLinks("file2.md", { validate: true })
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  }); */
