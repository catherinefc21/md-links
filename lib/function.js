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

// Leer archivo
export const readFiles = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(data);
    });
  });
};

// Leer directorio y devolver array con extención .md
/* export const processDirectory = (directoryPath) => {
  const files = fs.readdirSync(directoryPath, 'utf8');
  const mdFiles = files.filter(file => path.extname(file) === '.md');
  const allPromises = mdFiles.map(file => {
  const filePath = path.join(absolutePath, file);
  return filePath;
});
} */
// obtener links
export const getLinks = (content, route) => {
  const links = [];
  const renderer = new marked.Renderer();
  renderer.link = (href, title, text) => {
    links.push({ href, text, file: route });
  };
  marked(content, { renderer, headerIds: false, mangle: false });
  return links;
};

// validar links
export const validateLinks = (links) => {
  const validatePromises = links.map((link) => {
    return axios
      .head(link.href)
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
/*export const optionStats = () =>{
  // necesito contar los links del array
  new Promise((resolve, reject)=>{
    resolve(()=>{
      total: getLinks.length
      unique: 
    })
  })
}*/
