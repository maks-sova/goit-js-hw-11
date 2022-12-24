import axios from "axios";
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { render } from "../src/render";

const key = "32335865-69b3ae51a78e79767c682fcdb"

export const refs = {
    form: document.querySelector('.search-form'),
    gallery: document.querySelector('.gallery'),      
}

refs.form.style.display = "flex";
refs.form.style.justifyContent = "center";
refs.form.style.marginBottom = "20px";

let page = 0;
const perPage = 40;

refs.form.addEventListener('submit', search);

async function search (e) {
  e.preventDefault();

  refs.gallery.innerHTML = ""
    const request = refs.form.elements.searchQuery.value
    page = 1;
  try {
    const response = await axios.get(`https://pixabay.com/api/?key=${key}&q=${request}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPage}&page=${page}`)
    const hits = await getHits(response.data);
    const fotos = await getFotos(hits);
  } catch (error) {
    console.log(error);
  }
}

async function getHits(data) {
  const { totalHits, hits } = data;
  if (totalHits && page===1) {
    Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`)
  }
  if ((page>1 && page * perPage >= totalHits) || (totalHits && totalHits<=perPage)) {
        Notiflix.Notify.warning(`We're sorry, but you've reached the end of search results.`);
        
      }
  return hits
}

async function getFotos(data) {
  if (data.length === 0) {
    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
  }
  else {
    render(data)
  }
}

window.addEventListener('scroll', () => { 
  if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
    loadMore()
  }
});

async function loadMore (e) {
    
    const request = refs.form.elements.searchQuery.value
    page += 1;
  try {
    const response = await axios.get(`https://pixabay.com/api/?key=${key}&q=${request}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPage}&page=${page}`)
    const hits = await getHits(response.data);
    const fotos = await getFotos(hits)
  } catch (error) {
    console.log(error);
  }    
}