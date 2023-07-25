import chalk from 'chalk';
import { functionStats } from './lib/function.js';
import { mdLinks } from './lib/index.js';

// Obtención de argumentos de línea de comandos
const path = process.argv[2]; // Ruta
const optionValidate = process.argv.includes('--validate');
const optionStats = process.argv.includes('--stats');
// creo las opciones
const options = {
  validate: optionValidate,
  stats: optionStats,
};

// Función para procesar los enlaces y mostrar los resultados según las opciones seleccionadas
const processMdlinks = (route, options) => {
  // Llamo a la función mdLinks para obtener los enlaces del archivo Markdown
  mdLinks(route, { validate: options.validate })
    .then((links) => {
      if (options.validate && options.stats) {
        // Si se seleccionó la opción --stats y --validate, se calculan las estadísticas
        functionStats(links, 'validate')
          .then((stats) => {
            console.log(chalk.bold.underline.green('Estadísticas'));
            console.log(chalk.cyan(`-Total: ${stats.total}`));
            console.log(chalk.cyan(`-Unique: ${stats.unique}`));
            console.log(chalk.cyan(`-Broken: ${stats.broken}`));
          })
          .catch((error) => {
            console.error(error);
          });
      } else if (options.validate) {
        // Si se seleccionó la opción --validate, se muestra el estado de los enlaces
        links.forEach((link) => {
          const output = `${chalk.green(
            link.file
          )} ${chalk.underline.blackBright(link.href)} ${chalk.green(
            link.ok
          )} ${chalk.green(link.status)} ${chalk.cyan(link.text)}`;
          console.log(output);
        });
      } else if (options.stats) {
        // Si se seleccionó la opción --stats, se muestra el resumen de estadísticas
        functionStats(links)
          .then((stats) => {
            console.log(chalk.bold.underline.green('Estadísticas'));
            console.log(chalk.cyan(`-Total: ${stats.total}`));
            console.log(chalk.cyan(`-Unique: ${stats.unique}`));
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        // Si no se seleccionó ninguna opción, se muestra por defecto: ruta-enlace-texto
        links.forEach((link) => {
          const output = `${chalk.green(
            link.file
          )} ${chalk.underline.blackBright(link.href)} ${chalk.cyan(
            link.text
          )}`;
          console.log(output);
        });
      }
    })
    .catch((error) => {
      console.error(error);
    });
};
// Llamada a la función processMdlinks pasando la ruta del archivo y el objeto con las opciones
processMdlinks(path, options);
