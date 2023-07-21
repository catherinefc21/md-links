import { mdLinks } from "../mdLinks";

describe("mdLinks", () => {
  it("debería rechazar la promesa cuando el path no existe", () => {
    return mdLinks("pruebas3/file3.md").catch((error) => {
      expect(error).toBe("La ruta no existe");
    });
  });
  it("debería rechazar con un error cuando se le pasa un archivo que no es Markdown", () => {
    const path = "./prueba/file4.txt";
    // Agregamos un timeout mayor (por ejemplo, 10000 ms = 10 segundos)
    return expect(mdLinks(path)).rejects.toThrow("No es un archivo .md", {
      timeout: 10000,
    });
  });
  it("debería devolver un array vacío cuando el archivo no contiene enlaces", () => {
    const path = "./prueba/file2.md";
    return mdLinks(path).then((links) => {
      expect(Array.isArray(links)).toBe(true);
      expect(links.length).toBe(0);
    });
  });
});
