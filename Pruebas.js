import fs from 'fs';
import path from 'path';

// leer el archivo
fs.readFile('file3.txt', 'utf-8', (err, data) => {
  if(err) {
    console.log('error: ', err);
  } else {
    console.log(data);
  }
});
// conocer la extension de un archivo
const ext = path.extname('file3.txt');
console.log(ext);

// Obtener el contenido de un directorio (se usa la version sincrona para disminuir complejidad de algorimo recursivo)

const dir = fs.readdirSync('prueba');
console.log(dir)

// Unir dos rutas

const ruta = path.join('prueba/file1.md', 'file2.md');
console.log(ruta)

// comprobar si la ruta es absoluta
const absolutePath = (rout) =>{
  return new Promise((resolve, reject) => {
    if(path.isAbsolute(rout)){
      resolve('la ruta es absoluta')
    } else {
      reject('La ruta es relativa')
    }
  });
};

// verificar
absolutePath('prueba/file1.md')
  .then(()=> {
    console.log('La ruta es absoluta')
  })
  .catch((error)=>{
    console.log('La ruta es relativa')
  });


