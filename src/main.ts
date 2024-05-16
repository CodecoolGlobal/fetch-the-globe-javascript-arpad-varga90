import "./style.scss";

import getCountries from "./apiClient/getCountries";
import getCountryDetails, {
  type CountryDetails,
} from "./apiClient/getCountriDetails";
import { _el, _replaceOrAdd } from "./utils";

const app = document.querySelector<HTMLDivElement>("#app")!;

async function main() {
  const countries = await getCountries();

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

  const details = await getCountryDetails(cc);
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
