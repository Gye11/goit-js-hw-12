import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '54460001-4340b48267dd4c07393208eaa';

export async function fetchImages(query, page = 1) {
  const response = await axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page,
      per_page: 40,
    },
  });

  return response.data;
}
