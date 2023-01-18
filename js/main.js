const API_KEY = "b61c35f6";
const API_URL = `http://www.omdbapi.com/?apikey=${API_KEY}`;
const IMG_URL = `http://img.omdbapi.com/?apikey=${API_KEY}`;

const elForm = document.querySelector("[data-movie-form]");
const elList = document.querySelector("[data-movie-list]");
const elModal = document.querySelector("[data-modal]");
const elDiv = document.querySelector("[data-movie-about]");
elList.classList.add("movie__list");

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const formData = new FormData(elForm);
  const name = formData.get("name");
  searchMovies(name);
});

async function searchMovies(query) {
  const res = await fetch(`${API_URL}&s=${query}`);
  const searchResult = await res.json();

  renderMovie(searchResult.Search);
}

function renderMovie(movies) {
  elList.innerHTML = "";
  let html = "";
  movies.forEach((movie) => {
    html += `<li class="movie__list-li"><img class="movie__img" width="180" src="${movie.Poster}"  alt="${movie.Title}"/> <button
    data-modal-open="#test-modal"
    type="button"
    class="btn btn-light el-btn"
  >
    :
  </button><div><h6>${movie.Title}</h6></div></li>`;
  });

  elList.innerHTML = html;
}

document.addEventListener("click", (evt) => {
  orModalBtnClick(evt);
  onModalOutsideClick(evt);
  onModalCloseClick(evt);
});

function orModalBtnClick(evt) {
  const el = evt.target.closest("[data-modal-open]");

  if (!el) return;

  const modalSel = el.dataset.modalOpen;

  document.querySelector(modalSel).classList.add("show");
}

function onModalOutsideClick(evt) {
  const el = evt.target;

  if (!el.matches("[data-modal]")) return;

  el.classList.remove("show");
}

function onModalCloseClick(evt) {
  const el = evt.target.closest("[data-modal-close]");

  if (!el) return;

  el.parentElement.parentElement.classList.remove("show");
}

function createDiv(movie) {
  elDiv.querySelector("[data-title]").textContent = movie.Title;

  return elDiv;
}
