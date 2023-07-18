import path from "path";
import fs from "fs";
import { marked } from "marked";
import axios from "axios";

// convertir en ruta absoluta
export const convertAbsolutePath = (rout) => {
  if (!path.isAbsolute(rout)) {
    return path.resolve(rout);
  } else {
    return rout;
  }
};

// Leer directorio y devolver array con extención .md
export const processDirectory = (directoryPath, options) => {
  const files = fs.readdirSync(directoryPath);
  const mdFiles = files.filter((file) => path.extname(file) === ".md");

  const allPromises = mdFiles.map((file) => {
    const absoluteFilePath = path.join(directoryPath, file);
    return mdLinks(absoluteFilePath, options);
  });
  return Promise.all(allPromises).then((allLinks) => allLinks.flat());
};
// obtener links
export const getLinks = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      const links = [];
      const renderer = new marked.Renderer();
      renderer.link = (href, title, text) => {
        links.push({ href, text, file: filePath });
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
        ok: response.status >= 200 && response.status < 400 ? "ok" : "fail",
      }))
      .catch((error) => ({
        ...link,
        status: error.response ? error.response.status : "fail",
        ok: "fail",
      }));
  });
  return Promise.all(validatePromises);
};

// Mostrar estadísticas de los links Stats: total y únicos
export const functionStats = (links, options) => {
  return new Promise((resolve, reject) => {
    const uniqueLinks = new Set(links.map((link) => link.href));
    const uniqueCount = uniqueLinks.size;
    const stats = {
      total: links.length,
      unique: uniqueCount,
    };
    // agregar a funcion los links rotos si tiene la opcion --stats --validate
    if (options === "--stats --validate") {
      const failLinks = links.filter((link) => link.ok === "fail");
      stats.fail = failLinks.length;
    }
    resolve(stats);
  });
};
