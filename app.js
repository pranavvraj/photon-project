const auth = " 563492ad6f91700001000001c8139fc3c4764d5aaef67851d9ef1d08";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
const more = document.querySelector(".more");
let page = 1;
let searchValue;
let fetchLink;
let currentSearch;

//Event listeners
searchInput.addEventListener("input", updateInput);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  currentSearch = searchValue;
  searchPhotos(searchValue);
});

more.addEventListener("click", loadMore);
function updateInput(e) {
  searchValue = e.target.value;
}

async function curatedPhotos() {
  fetchLink = "https://api.pexels.com/v1/curated/?page=1";
  const dataFetch = await fetch(fetchLink, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: auth,
    },
  });
  const data = await dataFetch.json();
  data.photos.forEach((photo) => {
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("gallery-img");
    galleryImg.innerHTML = `
        <div class="gallery-info">
        <p>${photo.photographer}</p>
        <a href=${photo.src.original}>Download</a>
        </div>
        <img src=${photo.src.large}></img>
        `;
    gallery.appendChild(galleryImg);
  });
}

async function searchPhotos(query) {
  clear();
  fetchLink = `https://api.pexels.com/v1/search/?page=1&query=${query}`;
  const dataFetch = await fetch(fetchLink, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: auth,
    },
  });
  const data = await dataFetch.json();
  data.photos.forEach((photo) => {
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("gallery-img");
    galleryImg.innerHTML = `
        <div class="gallery-info">
        <p>${photo.photographer}</p>
        <a href=${photo.src.original}>Download</a>
        </div>
        <img src=${photo.src.large}></img>
        `;
    gallery.appendChild(galleryImg);
  });
  function clear() {
    gallery.innerHTML = "";
    searchInput.value = "";
  }
  async function loadMore() {
    page++;
    if (currentSearch) {
      fetchLink = `https://api.pexels.com/v1/search/?page=${page}&query=${query}`;
    } else {
      fetchLink = `https://api.pexels.com/v1/curated/?page=${page}`;
    }
    const data = await fetchApi(fetchLink);
    generatePictures(data);
  }
}
curatedPhotos();
