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

// Obtener el contenido de un directorio

const dir = fs.readdirSync('prueba');
console.log(dir)

// Unir dos rutas

const ruta = path.join('prueba/file1.md', 'file2.md');
console.log(ruta)