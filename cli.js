import chalk from 'chalk';
import { functionStats } from './lib/function.js';
import { mdLinks } from './mdLinks.js';

// Obtención de argumentos de línea de comandos
const path = process.argv[2]; // Ruta
const optionValidate = process.argv.includes('--validate'); // true si se seleccionó la opción --validate
const optionStats = process.argv.includes('--stats'); // true si se seleccionó la opción --stats

// Función para procesar los enlaces y mostrar los resultados según las opciones seleccionadas
const processMdlinks = (route, options) => {
  // Llamo a la función mdLinks para obtener los enlaces del archivo Markdown
  mdLinks(route, { validate: options.validate })
    .then((links) => {
      if (options.stats) {
        // Si se seleccionó la opción --stats, se calculan las estadísticas
        functionStats(links, { stats: true, validate: options.validate })
          .then((stats) => {
            console.log(chalk.bold.blackBright.underline('Estadísticas'));
            console.log(chalk.magentaBright(`Total: ${stats.total}`));
            console.log(chalk.magentaBright(`Unique: ${stats.unique}`));
            if (options.validate) {
              console.log(chalk.magentaBright(`Broken: ${stats.broken}`));
            }
          })
          .catch(console.error);
      } else {
        // Si no se seleccionó la opción --stats, se muestran los enlaces con sus estados
        links.forEach((link) => {
          const output = `${link.file} ${link.href} ${
            link.status ? 'ok' : 'fail'
          } ${link.status ? link.status : ''} ${link.text.substring(0, 50)}`;
          console.log(output);
        });
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

// Creación del objeto con las opciones booleanas
const options = {
  validate: optionValidate,
  stats: optionStats,
};

// Llamada a la función processMdlinks pasando la ruta del archivo y el objeto con las opciones
processMdlinks(path, options);
