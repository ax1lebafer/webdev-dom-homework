import { renderForm } from "./renderForm.js";
import { renderLoaderGet, renderLoaderPost } from "./renderLoaders.js";

export function renderApp({ getCommentsInfo, user, setUser }) {
  const containerElement = document.querySelector(".container");

  containerElement.innerHTML = `
    <div class="list-loader-get hidden"></div>
    <ul class="comments" id="comments"></ul>
    <div class="form"></div>
    <div class="list-loader-post hidden"></div>`;

  renderLoaderGet();
  renderLoaderPost();
  getCommentsInfo();
  renderForm({ user, setUser });
}
