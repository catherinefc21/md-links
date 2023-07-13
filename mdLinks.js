import fs from 'fs';
import path from 'path';
import { convertAbsolutePath, getLinks } from './lib/function.js';

export const mdLinks = (route) => {
  return new Promise((resolve, reject) => {
    // Verificar si existe la ruta 
    if (!fs.existsSync(route)) {
      reject('La ruta no existe');
      return;
    }
    // convertirla en absoluta
    const absolutePath = convertAbsolutePath(route);
    //console.log(absolutePath);

    // verificar si es archivo y si tiene extensión .md
    fs.stat(absolutePath, (err, stats) => {
      if (err) {
        reject(err);
        return;
      }
      // Si se cumple lo anterior leer el archivo y obtengo enlaces con mi función importada
      if (stats.isFile() && path.extname(absolutePath) === ".md") {
        fs.readFile(absolutePath, 'utf8', (err, content) => {
          if (err) {
            reject(err);
          } else {
            const links = getLinks(content, absolutePath);
            resolve(links);
          }
        });
      // Si es un directorio, traer los archivos y filtrar los que son .md
      } else if (stats.isDirectory()) {
        const files = fs.readdirSync(absolutePath);
        console.log(files);
        const mdFiles = files.filter(file => path.extname(file) === ".md");
        console.log(mdFiles);
        // crear array para cada archivo en mdFiles y luego llamo a getLinks para obtener los enlaces
        const allPromises = mdFiles.map(file => {
          const filePath = path.join(absolutePath, file); // unir las rutas 
          console.log(filePath)
          return new Promise((resolve, reject) => {
            fs.readFile(filePath, 'utf8', (err, content) => {
              if (err) {
                reject(err);
              } else {
                const links = getLinks(content, filePath);
                resolve(links);
              }
            });
          });
        });
        // esperar que todas las promesas se resuelvan y se devuelve un nuevo array con cada promesa
        Promise.all(allPromises)
          .then(allLinks => {
            const totalLinks = allLinks.flat();
            resolve(totalLinks);
          })
          .catch(reject);
      } else {
        reject('La ruta no es un archivo ni un directorio válido');
        // Si la options es True se deben validar y traer un array ***** HACER!!
      }
    });
  });
};
// probar en consola
mdLinks('prueba')
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });