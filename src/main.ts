import "./style.scss";

import {
  getCountries,
  getCountryDetails,
  type CountryDetails,
} from "./apiClient";

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
  await activeCountry(target);
}

async function activeCountry(el: HTMLElement) {
  const cc = el?.dataset?.cc;
  if (!cc) {
    return;
  }

  const activeClass = "countries-list__element--active";
  document.querySelector(`.${activeClass}`)?.classList.remove(activeClass);

  el.classList.add(activeClass);
  const details = await getCountryDetails(cc);
  renderCountry(details);
}

function renderCountry(country: CountryDetails) {
  const countryDiv = _el("div", { className: "country" });
  const countryFlag = _el("div", { className: "country__flag" });
  const flagImg = _el("img", { src: country.flags.svg });

  const nextButton = _el("button", {
    className: "country__next_btn",
    innerText: "Next",
  });

  nextButton.onclick = () => {
    const activeClass = ".countries-list__element--active";
    const activeElement = document.querySelector(activeClass);

    const nextSibling = activeElement?.nextSibling;
    if (nextSibling) {
      activeCountry(nextSibling as HTMLElement);
    }
  };

  const prevButton = _el("button", {
    className: "country__prev_btn",
    innerText: "Prev",
  });

  prevButton.onclick = () => {
    const activeClass = ".countries-list__element--active";
    const activeElement = document.querySelector(activeClass);

    const prevSibling = activeElement?.previousSibling;
    if (prevSibling) {
      activeCountry(prevSibling as HTMLElement);
    }
  };

  const controlPanel = _el("div", { className: "country__controls" });

  countryDiv.append(countryFlag, controlPanel);
  countryFlag.append(flagImg);
  controlPanel.append(prevButton, nextButton);

  _replaceOrAdd(".country", countryDiv);
}

main();
