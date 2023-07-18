import { mdLinks } from "./mdLinks.js";

const path = process.argv[2];
const optionValidate = process.argv[3];
const optionStats = process.argv[4];

const processMdlinks = (route, option1) => {
  if (option1 === "--validate") {
    mdLinks(route, { validate: true })
      .then((result) => console.log(result))
      .catch(console.error);
  } else {
    mdLinks(route, { validate: false })
      .then((result) => console.log(result))
      .catch(console.error);
  }
};

processMdlinks(path, optionValidate);
