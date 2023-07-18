import fs from "fs";
import path from "path";
import {
  convertAbsolutePath,
  readFiles,
  getLinks,
  validateLinks,
} from "./lib/function.js";

export const mdLinks = (route, options) => {
  return new Promise((resolve, reject) => {
    // Verificar si existe la ruta
    if (!fs.existsSync(route)) {
      reject("La ruta no existe");
      return;
    }
    // convertirla en absoluta
    const absolutePath = convertAbsolutePath(route);

    fs.stat(absolutePath, (err, stats) => {
      if (err) {
        reject(err);
        return;
      }
      if (stats.isFile() && path.extname(absolutePath) === ".md") {
        // Si la ruta es un archivo Markdown
        readFiles(absolutePath)
          .then((content) => {
            if (options && options.validate === true) {
              // Si se especifica la opción de validación, obtener y validar los links
              const links = getLinks(content, absolutePath);
              console.log(links);
              resolve(validateLinks(links));
            } else {
              // Si no se especifica la opción de validación, solo obtener los links
              const linksMd = getLinks(content, absolutePath);
              resolve(linksMd);
            }
          })
          .catch(reject);
      } else if (stats.isDirectory()) {
        // Si la ruta es un directorio
        const files = fs.readdirSync(absolutePath);
        const mdFiles = files.filter((file) => path.extname(file) === ".md");
        const allPromises = mdFiles.map((file) => {
          const filePath = path.join(absolutePath, file);
          return readFiles(filePath)
            .then((content) => {
              if (options && options.validate === true) {
                // Si se especifica la opción de validación, obtener y validar los links
                const links = getLinks(content, filePath);
                return validateLinks(links);
              } else {
                // Si no se especifica la opción de validación, solo obtener los links
                const linksMd = getLinks(content, filePath);
                return linksMd;
              }
            })
            .catch(reject);
        });
        // Esperar que todas las promesas se resuelvan y devolver un nuevo array con cada promesa
        Promise.all(allPromises)
          .then((allLinks) => {
            const totalLinks = allLinks.flat();
            resolve(totalLinks);
          })
          .catch(reject);
      } else {
        reject(new Error("La ruta no es un archivo ni un directorio válido"));
      }
    });
  });
};

// Pruebas en terminal
/*mdLinks("file2.md", { validate: true })
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });
*/
