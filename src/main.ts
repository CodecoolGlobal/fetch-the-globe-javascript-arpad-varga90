import "./style.scss";

import getCountries from "./getCountries";
import getCountryDetails, { type CountryDetails } from "./getCountriDetails";

// GET All Countries
const ALL =
  "https://jvvkjy8utk.execute-api.eu-central-1.amazonaws.com/tourist/api/countries/all";

// GET Countries by cca3
const DETAILS =
  "https://jvvkjy8utk.execute-api.eu-central-1.amazonaws.com/tourist/api/countries/by-cca3";

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
    li.onclick = handleCountryClick;
    ul.append(li);
  }
  app.append(ul);
}

async function handleCountryClick(event: MouseEvent) {
  const target = event.target as HTMLElement;
  if (!target) {
    return;
  }

  const cc = target.dataset.cc;
  if (!cc) {
    return;
  }

  const details = await getCountryDetails(DETAILS, cc);
  renderCountry(details);
}

function renderCountry(country: CountryDetails) {
  const div = document.createElement("div");
  div.className = "country";

  const flag = document.createElement("div");
  flag.className = "country__flag";

  const img = document.createElement("img");
  img.src = country.flags.svg;

  div.append(flag);
  flag.append(img);

  const existing = document.querySelector(".country");

  if (existing) {
    existing.replaceWith(div);
  } else {
    app.append(div);
  }
}

main();
