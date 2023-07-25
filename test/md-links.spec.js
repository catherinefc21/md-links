import path from 'path';
import {
  convertAbsolutePath,
  isDirectory,
  processDirectory,
  fileMd,
  getLinks,
  validateLinks,
  functionStats,
} from '../lib/function.js';

describe('convertAbsolutePath', () => {
  it('Convierte ruta relativa en absoluta', () => {
    const relativePath = 'file2.md';
    const expectedAbsolutePath = path.resolve(relativePath);
    const result = convertAbsolutePath(relativePath);
    expect(result).toBe(expectedAbsolutePath);
  });
  it('debería mantener una ruta absoluta sin cambios', () => {
    const absolutePath = 'C:\\Users\\HP\\Desktop\\md-links\\file2.md';
    expect(convertAbsolutePath(absolutePath)).toBe(absolutePath);
  });
});

describe('IsDirectory', () => {
  it('debería devolver true para un directorio existente', () => {
    const existingDirectory = 'prueba';
    return isDirectory(existingDirectory).then((result) => {
      expect(result).toBe(true);
    });
  });
  it('debería devolver false para un archivo válido', () => {
    const existingFile = 'C:\\Users\\HP\\Desktop\\md-links\\file2.md';
    isDirectory(existingFile).then((result) => {
      expect(result).toBe(false);
    });
  });
  it('debería devolver rechazar la promesa cuando la ruta no es válida', () => {
    const route = 'C:\\Users\\HP\\Desktop\\noexiste.md';
    isDirectory(route).catch((err) => {
      expect(err).toBeInstanceOf(Error);
    });
  });
});

describe('processDirectory', () => {
  it('debería devolver un array vacío en un directorio sin archivos .md', () => {
    const result = processDirectory('./prueba2');
    expect(result).toEqual([]);
  });

  it('debería devolver un array con las rutas de los archivos .md encontrados en el directorio y subdirectorios', () => {
    const result = processDirectory('./prueba');
    expect(result).toEqual([
      'C:\\Users\\HP\\Desktop\\md-links\\prueba\\file1.md',
      'C:\\Users\\HP\\Desktop\\md-links\\prueba\\file2.md',
      'C:\\Users\\HP\\Desktop\\md-links\\prueba\\prueba2\\file11.md',
      'C:\\Users\\HP\\Desktop\\md-links\\prueba\\prueba2\\prueba3\\file12.md',
    ]);
  });

  it('debería procesar correctamente subdirectorios', () => {
    const result = processDirectory('./prueba');
    expect(result).toContain(
      'C:\\Users\\HP\\Desktop\\md-links\\prueba\\prueba2\\file11.md'
    );
  });
});

describe('fileMd', () => {
  it('debería devolver la ruta del archivo si es un archivo .md', () => {
    const route = 'C:\\Users\\HP\\Desktop\\md-links\\file2.md';
    const result = fileMd(route);
    expect(result).toEqual([route]);
  });

  it('debería arrojar un error si no es un archivo .md', () => {
    const route = '/ruta/del/archivo.txt';
    expect(() => fileMd(route)).toThrowError('No es un archivo .md');
  });
});

describe('getLinks', () => {
  it('debería devolver un array vacío si el archivo no contiene enlaces', () => {
    const file = 'C:\\Users\\HP\\Desktop\\md-links\\prueba\\file2.md';
    getLinks(file).then((result) => {
      expect(result).toEqual([]);
    });
  });
  it('debería devolver un array de objetos con los enlaces encontrados en el archivo', () => {
    const file = 'C:\\Users\\HP\\Desktop\\md-links\\file2.md';
    getLinks(file).then((result) => {
      expect(result).toEqual([
        {
          href: 'https://www.google.com',
          text: 'enlace a google',
          file: 'C:\\Users\\HP\\Desktop\\md-links\\file2.md',
        },
        {
          href: 'https://www.laboratoria.la/noexiste',
          text: 'enlace a laboratoria roto',
          file: 'C:\\Users\\HP\\Desktop\\md-links\\file2.md',
        },
      ]);
    });
  });
  it('debería devolver rechazar la promesa si ocurre un error al leer el archivo', () => {
    const failroute = 'C:\\Users\\HP\\Desktop\\noexiste.md';
    return getLinks(failroute).catch((err) => {
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toBe('Error al leer el archivo.');
    });
  });
});

describe('validateLinks', () => {
  const links = [
    {
      href: 'https://www.google.com',
      text: 'enlace a google',
      file: 'C:\\Users\\HP\\Desktop\\md-links\\file2.md',
    },
    {
      href: 'https://www.laboratoria.la/noexiste',
      text: 'enlace a laboratoria roto',
      file: 'C:\\Users\\HP\\Desktop\\md-links\\file2.md',
    },
  ];
  it('Debería validar los links y manejar los errores', () => {
    return validateLinks(links).then((result) => {
      result.forEach((link) => {
        expect(link).toHaveProperty('status');
        expect(link).toHaveProperty('ok');

        // Verificar que el primer enlace tenga un estado 200 y ok 'ok'
        expect(result[0].status).toBe(200);
        expect(result[0].ok).toBe('✔ ok');
      });
    });
  });
  it('debería Verificar que el segundo enlace tenga un status: 404 y ok: fail', () => {
    return validateLinks(links).catch((result) => {
      expect(result[1].status).toBe('404');
      expect(result[1].ok).toBe('fail');
    });
  });
  it('Debería devolver una promesa resuelta con un array vacío cuando no hay enlaces', () => {
    const links = [];
    return validateLinks(links).then((result) => {
      expect(result).toEqual([]);
    });
  });
});

describe('functionStats', () => {
  const links = [
    {
      href: 'https://www.google.com',
      text: 'enlace a google',
      file: 'C:\\Users\\HP\\Desktop\\md-links\\file2.md',
      status: 200,
      ok: 'ok',
    },
    {
      href: 'https://www.example.com/nonexistent',
      text: 'enlace inexistente',
      file: 'C:\\Users\\HP\\Desktop\\md-links\\file2.md',
      status: 404,
      ok: 'fail',
    },
    {
      href: 'https://www.google.com',
      text: 'enlace a google',
      file: 'C:\\Users\\HP\\Desktop\\md-links\\file2.md',
      status: 200,
      ok: 'ok',
    },
  ];

  it('debería retornar las estadísticas total y únicos links, si no se le pasa las opciones', () => {
    const options = '';
    return functionStats(links, options).then((stats) => {
      expect(stats).toEqual({
        total: 3,
        unique: 2,
      });
    });
  });

  it('debería retornar las estadísticas incluyendo el los links rotos cuando se le pasan las opciones', () => {
    const options = 'validate';
    return functionStats(links, options).then((stats) => {
      expect(stats).toEqual({
        total: 3,
        unique: 2,
        broken: 1,
      });
    });
  });
});
