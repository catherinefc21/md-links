import { functionStats } from "./lib/function.js";
import { mdLinks } from "./mdLinks.js";

const path = process.argv[2];
const optionValidate = process.argv[3];
const optionStats = process.argv[4];

const processMdlinks = (route, option1, option2) => {
  if (option1 === "--validate" && option2 === "--stats") {
    mdLinks(route, { validate: true }).then((result) => {
      const arrayLinks = result;
      functionStats(arrayLinks, "--stats --validate")
        .then((result) => console.log("Estadística", result))
        .catch(console.error);
    });
  } else if (option1 === "--validate") {
    mdLinks(route, { validate: true })
      .then((result) => console.log(result))
      .catch(console.error);
  } else if (option1 === "--stats") {
    mdLinks(route, { validate: false }).then((result) => {
      const arrayLinks = result;
      functionStats(arrayLinks)
        .then((result) => console.log("Estadística", result))
        .catch(console.error);
    });
  } else {
    mdLinks(route, { validate: false })
      .then((result) => console.log(result))
      .catch(console.error);
  }
};

processMdlinks(path, optionValidate, optionStats);
