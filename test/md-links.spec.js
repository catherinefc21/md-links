import { mdLinks } from "../mdLinks";

describe('mdLinks', () => {
  it('should...', () => {
    console.log('FIX ME!');
  });
  //it('debería retornar una promesa', () => {
  // expect(mdLinks()).toBeInstanceOf(Promise)
  //})
  it('debería rechazar la promesa cuando el path no existe', () =>{
    return(mdLinks('pruebas3/file3.md')).catch((error) => {
      expect(error).toBe('La ruta no existe');
    })
  })
});
