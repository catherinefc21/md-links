import path from 'path';
import { marked } from 'marked';

// convertir en ruta absoluta
export const convertAbsolutePath = (rout) =>{
  if(!path.isAbsolute(rout)){
    return path.resolve(rout)
  } else{
    return rout;
  } 
}   
console.log(convertAbsolutePath('prueba/file1.md'))

export const getLinks = (content, route) => {
  const links = [];
  const renderer = new marked.Renderer();
  renderer.link = (href, title, text) => {
    links.push({ href, text, file: route });
  };
  marked(content, { renderer });
  return links;
};
