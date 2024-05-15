import "./style.css";

// GET All Countries
// https://jvvkjy8utk.execute-api.eu-central-1.amazonaws.com/tourist/api/countries/all

// GET Countries by cca3
// https://jvvkjy8utk.execute-api.eu-central-1.amazonaws.com/tourist/api/countries/by-cca3/FRA


const app = document.querySelector<HTMLDivElement>("#app");

if (app) {
  app.innerHTML = `<h1>Hello World</h1>`;
} else {
  console.log("Error happened");
}
