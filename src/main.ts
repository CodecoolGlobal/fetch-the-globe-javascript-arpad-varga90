import "./style.scss";

import getCountries from "./getCountries";

// GET All Countries
const ALL =
  "https://jvvkjy8utk.execute-api.eu-central-1.amazonaws.com/tourist/api/countries/all";

// GET Countries by cca3
// https://jvvkjy8utk.execute-api.eu-central-1.amazonaws.com/tourist/api/countries/by-cca3/FRA

const app = document.querySelector<HTMLDivElement>("#app")!;

async function main() {
  const countries = await getCountries(ALL);

  const ul = document.createElement("ul");
  ul.className = "countries-list";

  for (const country of countries) {
    const li = document.createElement("li");
    li.innerText = country.name.common;
    li.dataset.cc = country.cca3;
    li.className = "countries-list__element";
    ul.append(li);
  }
  app.append(ul);
}

main();
