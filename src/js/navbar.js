import {renderDOMBeers} from './beers'

const searchForm = document.querySelector('#search-form')
const searchInput = document.querySelector('.input.search')
const limitInput = document.querySelector('.input.limit')
const yearInput = document.querySelector('.input.year')
searchForm.addEventListener('submit', (evt) => {
    console.log('Input, limit, year: ', searchInput.value, limitInput.value, yearInput.value )
    evt.preventDefault();
    renderDOMBeers(searchInput.value, limitInput.value, yearInput.value)
    // if (searchInput.value !== '' && limitInput.value === ''){
    //     renderDOMBeers(searchInput.value, null, yearInput.value)
    // } else if (searchInput.value !== '' && limitInput.value !== ''){
    //     renderDOMBeers(searchInput.value, limitInput.value, yearInput.value)
    // } else if (searchInput.value === '' && limitInput.value === '' && yearInput.value !== '') {
    //     renderDOMBeers(null, null, yearInput.value)
    // }
})