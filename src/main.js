import { fetchImages } from './pixabay-api.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const loadingText = document.querySelector('.loading-text');

let page = 1;
let query = '';
let lightbox = new SimpleLightbox('.gallery a');

form.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();

  query = e.target.elements[0].value.trim();
  if (!query) {
    iziToast.warning({
      message: 'Please enter a search query!',
      position: 'topRight',
    });
    return;
  }

  page = 1;
  gallery.innerHTML = '';
  loadMoreBtn.classList.add('is-hidden');
  loadingText.classList.remove('is-hidden');

  fetchImages(query, page)
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.info({
          message: 'Sorry, no images found.',
          position: 'topRight',
        });
        return;
      }

      renderImages(data.hits);
      lightbox.refresh();

      if (data.totalHits > 20) {
        loadMoreBtn.classList.remove('is-hidden');
      }
    })
    .catch(() => {
      iziToast.error({
        message: 'Something went wrong. Try again later.',
        position: 'topRight',
      });
    })
    .finally(() => {
      loadingText.classList.add('is-hidden');
    });
}

function onLoadMore() {
  page += 1;

  fetchImages(query, page)
    .then(data => {
      renderImages(data.hits);
      lightbox.refresh();

      if (gallery.children.length >= data.totalHits) {
        loadMoreBtn.classList.add('is-hidden');
        iziToast.info({
          message: "You've reached the end of search results.",
          position: 'topRight',
        });
      }
    })
    .catch(() => {
      iziToast.error({
        message: 'Error loading more images.',
        position: 'topRight',
      });
    });
}

function renderImages(images) {
  const markup = images
    .map(
      img => `
      <a href="${img.largeImageURL}" class="photo-card">
        <img src="${img.webformatURL}" alt="${img.tags}" loading="lazy" />
        <div class="info">
          <p><b>Likes</b> ${img.likes}</p>
          <p><b>Views</b> ${img.views}</p>
          <p><b>Comments</b> ${img.comments}</p>
          <p><b>Downloads</b> ${img.downloads}</p>
        </div>
      </a>
    `
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
}
