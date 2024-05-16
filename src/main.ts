import "./style.scss";

import getCountries from "./getCountries";
import getCountryDetails, { type CountryDetails } from "./getCountriDetails";
import { _el, _replaceOrAdd } from "./utils";

// GET All Countries
const ALL =
  "https://jvvkjy8utk.execute-api.eu-central-1.amazonaws.com/tourist/api/countries/all";

// GET Countries by cca3
const DETAILS =
  "https://jvvkjy8utk.execute-api.eu-central-1.amazonaws.com/tourist/api/countries/by-cca3";

const app = document.querySelector<HTMLDivElement>("#app")!;

async function main() {
  const countries = await getCountries(ALL);

  const ul = _el("ul", { className: "countries-list" });

  for (const country of countries) {
    const li = _el("li", {
      innerText: country.name.common,
      className: "countries-list__element",
    });
    li.dataset.cc = country.cca3;
    li.onclick = handleCountryClick;
    ul.append(li);
  }
  app.append(ul);
}

async function handleCountryClick(event: MouseEvent) {
  const target = event.target as HTMLElement;
  const cc = target?.dataset?.cc;

  if (!cc) {
    return;
  }

  const details = await getCountryDetails(DETAILS, cc);
  renderCountry(details);
}

function renderCountry(country: CountryDetails) {
  const countryDiv = _el("div", { className: "country" });
  const countryFlag = _el("div", { className: "country__flag" });
  const flagImg = _el("img", { src: country.flags.svg });

  countryDiv.append(countryFlag);
  countryFlag.append(flagImg);

  _replaceOrAdd(".country", countryDiv);
}

main();
