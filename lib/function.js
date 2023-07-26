import path from 'path';
import fs from 'fs';
import { marked } from 'marked';
import axios from 'axios';

// convertir en ruta absoluta
export const convertAbsolutePath = (rout) => {
  if (!path.isAbsolute(rout)) {
    return path.resolve(rout);
  } else {
    return rout;
  }
};

// la ruta es un directorio, me retorna true o false
export const isDirectory = (route) => {
  return new Promise((resolve, reject) => {
    fs.stat(route, (err, stats) => {
      if (err) {
        const error = new Error('la ruta no es válida');
        reject(error);
        return;
      }
      resolve(stats.isDirectory());
    });
  });
};
// Si es directorio ingresar al directorio, función recursiva
export const processDirectory = (route) => {
  const files = fs.readdirSync(route);
  const pathFile = []; // Creamos un array para almacenar las rutas de los archivos

  files.forEach((content) => {
    const absolutePathFile = path.join(route, content);
    const verificaPath = fs.statSync(absolutePathFile);
    if (verificaPath.isDirectory()) {
      // Si es un directorio, procesamos su contenido recursivamente
      const filesSubdirectory = processDirectory(absolutePathFile);
      pathFile.push(...filesSubdirectory); // Agregamos las rutas de los archivos encontrados en el subdirectorio actual
    } else if (verificaPath.isFile() && path.extname(content) === '.md') {
      pathFile.push(convertAbsolutePath(absolutePathFile)); // Si es un archivo .md, lo agregamos al array
    }
  });
  return pathFile; // Retornamos el array con todos las rutas de los archivos
};
// si es archivo verificar si es .md
export const fileMd = (route) => {
  if (path.extname(route) === '.md') {
    return [route];
  } else {
    throw new Error('No es un archivo .md');
  }
};

// obtener links
export const getLinks = (route) => {
  return new Promise((resolve, reject) => {
    fs.readFile(route, 'utf8', (err, data) => {
      if (err) {
        const error = new Error('Error al leer el archivo.');
        reject(error);
        return;
      }
      const links = [];
      const renderer = new marked.Renderer();
      renderer.link = (href, title, text) => {
        const truncatedText = text.slice(0, 50); // Truncar el texto a 50 caracteres
        const absFile = path.resolve(route);
        links.push({ href, text: truncatedText, file: absFile });
      };
      marked(data, { renderer, headerIds: false, mangle: false });
      resolve(links);
    });
  });
};
// validar links
export const validateLinks = (links) => {
  const validatePromises = links.map((link) => {
    return axios
      .get(link.href)
      .then((response) => ({
        ...link,
        status: response.status,
        ok: response.status >= 200 && response.status < 400 ? '✔ ok' : 'fail',
      }))
      .catch((error) => ({
        ...link,
        status: error.response ? error.response.status : 'fail',
        ok: '✖ fail',
      }));
  });
  return Promise.all(validatePromises);
};

// Mostrar estadísticas de los links Stats: total y únicos
export const functionStats = (links, options) => {
  return new Promise((resolve, reject) => {
    const uniqueLinks = new Set(links.map((link) => link.href)).size;
    const stats = {
      total: links.length,
      unique: uniqueLinks,
    };

    if (options === 'validate') {
      const brokenLinks = links.filter((link) => link.ok === 'fail');
      stats.broken = brokenLinks.length;
    }

    resolve(stats);
  });
};
