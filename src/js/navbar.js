import {renderDOMBeers} from './beers'

const searchForm = document.querySelector('#search-form')
const searchInput = document.querySelector('.input.search')
searchForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (searchInput.value !== ''){
        renderDOMBeers(searchInput.value)
    }
})