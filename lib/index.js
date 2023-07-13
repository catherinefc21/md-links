import fs from 'fs';
// comprobar si la ruta existe
export const existRoute = (filePath) => {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(filePath)) {
      resolve('La ruta existe');
    } else {
      reject('La ruta no existe');
    }
  });
};
// ejemplosss para verificar
existRoute('prueba/file1.md')
  .then(() => {
    console.log('La ruta existe');
  })
  .catch((error) => {
    console.log('error: ', error);
  });