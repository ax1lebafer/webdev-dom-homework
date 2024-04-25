import { getCommentsInfo } from "./main.js";
import { renderForm } from "./renderForm.js";
import { renderLoaderGet, renderLoaderPost } from "./renderLoaders.js";

export function renderApp({ persons }) {
  const containerElement = document.querySelector(".container");

  containerElement.innerHTML = `
    <div class="list-loader-get"></div>
    <ul class="comments" id="comments"></ul>
    <div class="list-loader-post hidden"></div>
    <div class="form"></div>`

  renderLoaderGet();
  renderLoaderPost();
  getCommentsInfo();
  renderForm({ persons });
}
