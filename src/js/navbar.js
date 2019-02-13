import {renderDOMBeers} from './beers'

const searchForm = document.querySelector('#search-form')
const searchInput = document.querySelector('.input.search')
const limitInput = document.querySelector('.input.limit')
searchForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (searchInput.value !== '' && limitInput.value === ''){
        renderDOMBeers(searchInput.value)
    } else if (searchInput.value !== '' && limitInput.value !== ''){
        renderDOMBeers(searchInput.value, limitInput.value)
    }
})