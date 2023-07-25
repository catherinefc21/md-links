# Markdown Links

## Índice

* [1. Descripción de md-Links](#1-descripción)
* [2. Instalación](#2-instalación)
* [3. Opciones de uso](#3-objetivos-de-aprendizaje)
* [4. Sobre el proyecto](#4-consideraciones-generales)
* [5. Plan de acción](#5-criterios-de-aceptación-mínimos-del-proyecto)
* [6. Entregables](#6-entregables)
***

## 1. Descripción de md-Links
![project](images/portada.png)
md-links es una biblioteca creada con JavaScript y Node.js que analiza archivos Markdown ".md" y extrae los enlaces encontrados en ellos. También puede validar el estado de los enlaces y proporciona estadísticas, como el número total de enlaces, enlaces únicos y enlaces rotos.


## 2. Instalación

Puedes instalar md-links utilizando npm. Ejecuta el siguiente comando en tu terminal:
npm i catherinefc21-md-links

## 3. Opciones de uso

Se ejecuta de la siguiente manera a través de la terminal:

md-links <path-to-file> [options]

Por ejemplo:

$ md-links ./some/example.md
./some/example.md http://algo.com/2/3/ Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html algún doc
./some/example.md http://google.com/ Google
El comportamiento por defecto consiste en analizar un archivo Markdown recibido como argumento, sin validar si las URLs incluidas en el archivo responden correctamente. El objetivo principal es identificar el archivo Markdown, examinar su contenido y mostrar los enlaces encontrados. Para cada enlace, se imprimirá la ruta del archivo donde aparece y el texto dentro del enlace, limitado a 50 caracteres.

Options
--validate
mdlinks-perez <path-to-file> --validate

Si pasamos la opción --validate, el módulo debe hacer una petición HTTP para averiguar si el link funciona o no.

Por ejemplo:

$ md-links ./some/example.md --validate
./some/example.md http://algo.com/2/3/ ok 200 Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html fail 404 algún doc
./some/example.md http://google.com/ ok 301 Google
Vemos que el output en este caso incluye la palabra ok o fail después de la URL, así como el status de la respuesta recibida a la petición HTTP a dicha URL.

--stats
mdlinks-perez <path-to-file> --stats

Si pasamos la opción --stats el output (salida) será un texto con estadísticas básicas sobre los links.

$ md-links ./some/example.md --stats
Total: 3
Unique: 3
También podemos combinar --stats y --validate para obtener estadísticas que necesiten de los resultados de la validación.

mdlinks-perez <path-to-file> --stats --validate

$ md-links ./some/example.md --stats --validate
Total: 3
Unique: 3
Broken: 1

## 4. Sobre el proyecto
Markdown es un lenguaje de marcado ligero muy popular entre developers. Es usado en muchísimas plataformas que manejan texto plano (GitHub, foros, blogs, ...) y es muy común encontrar varios archivos en ese formato en cualquier tipo de repositorio (empezando por el tradicional README.md).

Estos archivos Markdown normalmente contienen links (vínculos/ligas) que muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de la información que se quiere compartir.

Dentro de una comunidad de código abierto, nos han propuesto crear una herramienta usando Node.js, que lea y analice archivos en formato Markdown, para verificar los links que contengan y reportar algunas estadísticas.

Módulo instalable via npm install <github-user>/md-links. Este módulo debe incluir tanto un ejecutable como una interfaz que podamos importar con require para usarlo programáticamente.


## 5. Plan de ación
En este proyecto, se nos sugirió emplear una herramienta de planificación y organización llamada GitHub Projects de GitHub. Esta herramienta nos permite utilizar issues y milestones para organizar y planificar tareas y objetivos específicos de manera efectiva.
diagrama de flujo...

[Github proyect](https://github.com/users/catherinefc21/projects/2)


