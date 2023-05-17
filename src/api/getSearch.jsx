const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '34842285-9ef26a99ee49cc306160c27d8';
const PICS_ON_PAGE = 12;

export const getSearch = (searchText, page) => {
  const params = new URLSearchParams({
    q: searchText,
    page: page,
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: PICS_ON_PAGE,
  });
  return fetch(`${BASE_URL}?${params}`);
};
