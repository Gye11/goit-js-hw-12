import { fetchImages } from './pixabay-api.js';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const loadingText = document.querySelector('.loading-text');

let page = 1;
let query = '';
let totalPages = 0;

form.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

async function onSearch(e) {
  e.preventDefault();
  query = e.target.searchQuery.value.trim();
  page = 1;
  gallery.innerHTML = '';
  loadMoreBtn.classList.add('is-hidden');

  if (!query) return;

  loadingText.classList.remove('is-hidden');

  const data = await fetchImages(query, page);
  totalPages = Math.ceil(data.totalHits / 20);

  renderImages(data.hits);

  loadingText.classList.add('is-hidden');

  if (page < totalPages) {
    loadMoreBtn.classList.remove('is-hidden');
  }
}

async function onLoadMore() {
  page += 1;
  loadingText.classList.remove('is-hidden');

  const data = await fetchImages(query, page);
  renderImages(data.hits);

  loadingText.classList.add('is-hidden');

  smoothScroll();

  if (page >= totalPages) {
    loadMoreBtn.classList.add('is-hidden');
    alert("We're sorry, but you've reached the end of search results");
  }
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
      </div>
    `
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
}

function smoothScroll() {
  const cardHeight = gallery.firstElementChild.getBoundingClientRect().height;
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
