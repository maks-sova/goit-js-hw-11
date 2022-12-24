import {refs} from "./index"

export function render(array) {
  const fotos = array.map(({largeImageURL, webformatURL, tags, likes, views, comments, downloads}) => `
        <a href="${largeImageURL}">        
        <div class="photo-card">  
        <img src="${webformatURL}" alt="${tags}" loading="lazy"/>
  <div class="info">
    <p class="info-item">
      <b>Likes: <span class="block">${likes}</span></b>
    </p>
    <p class="info-item">
      <b>Views: <span class="block">${views}</span></b>
    </p>
    <p class="info-item">
      <b>Comments: <span class="block">${comments}</span></b>
    </p>
    <p class="info-item">
      <b>Downloads: <span class="block">${downloads}</span></b>
    </p>
  </div>
</div>
</a>

`).join('')
              
              refs.gallery.innerHTML += fotos; 

              const lightbox = new SimpleLightbox('.gallery a');
              lightbox.refresh();
              const info = document.querySelectorAll('.info');

              for (const inf of info) {
                inf.style.color = "black";
                inf.style.display = "flex";
                inf.style.justifyContent = "space-between";
              }

             const links = document.querySelectorAll('a');

              for (const link of links) {
                link.style.textDecoration = "none";
              }

              const photoCards = document.querySelectorAll('.photo-card');

              for (const photoCard of photoCards) {

                photoCard.style.width = "330px";
                photoCard.style.border = "solid"
                photoCard.style.borderColor = "green"
                photoCard.style.marginBottom = "10px"

              }


              refs.gallery.style.display = "flex";
              refs.gallery.style.flexWrap = "wrap"; 
              refs.gallery.style.justifyContent = "space-between"; 
              
              const images = document.querySelectorAll('img');
              
              
for (const image of images) {

  image.style.width = "100%"; 
  image.style.height = "210px"; 
}
              
  const blocks = document.querySelectorAll('.block');

for (const block of blocks) {

  block.style.display = "flex"; 
  block.style.justifyContent = "center"
}
              
            }