import getRefs from './js/getRefs';
import photoCardTpl from '../templates/photo-card.hbs';

export default function getRefs() {
    return {
        gallery: document.querySelector('.gallery'),
        searchInput: document.querySelector('input'),
    };
}

const refs = getRefs();

const debounce = require('lodash.debounce');

const loadMore = document.createElement('button');
loadMore.className = 'load-more load-more_hidden';
loadMore.innerText = 'Load more';
loadMore.addEventListener('click', () => {
    searchImages();
    // setTimeout(() => window.scrollTo(0, window.innerHeight * page()), 300);
    setTimeout(() => window.scrollTo({
        top: window.innerHeight * page(),
        behavior: 'smooth'
    }), 300);
});
    
document.body.appendChild(loadMore);

refs.searchInput.addEventListener(
    'input',
    debounce(() => {
        searchImages(true);
    }, 500)
);
 
function searchImages(isReset) { 
    fetchImages(refs.searchInput.value)
        .then(data => renderImagesList(data.hits, isReset))
        .then(() => loadMore.classList.remove('load-more_hidden'))
        .catch(error => console.log(error));
}

function renderImagesList(images, isReset) {
    const markup = photoCardTpl(images);
    if (isReset) refs.gallery.innerHTML = markup;
    else refs.gallery.innerHTML += markup;
}
