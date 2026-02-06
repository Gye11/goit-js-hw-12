import { fetchImages } from './pixabay-api.js';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const loadingText = document.querySelector('.loading-text');

let page = 1;
let query = '';

form.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

async function onSearch(e) {
  e.preventDefault();

  query = e.target.elements[0].value.trim();
  page = 1;
  gallery.innerHTML = '';
  loadMoreBtn.classList.add('is-hidden');

  if (!query) return;

  loadingText.classList.remove('is-hidden');

  const data = await fetchImages(query, page);

  loadingText.classList.add('is-hidden');

  renderImages(data.hits);

  if (data.totalHits > 40) {
    loadMoreBtn.classList.remove('is-hidden');
  }
}

async function onLoadMore() {
  page += 1;
  const data = await fetchImages(query, page);
  renderImages(data.hits);
}

function renderImages(images) {
  const markup = images
    .map(
      img => `
      <div class="photo-card">
        <img src="${img.webformatURL}" alt="${img.tags}" loading="lazy" />
        <div class="info">
          <p>Likes ${img.likes}</p>
          <p>Views ${img.views}</p>
          <p>Comments ${img.comments}</p>
          <p>Downloads ${img.downloads}</p>
        </div>
      </div>`
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
}
