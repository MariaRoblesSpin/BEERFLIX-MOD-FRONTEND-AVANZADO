import {renderDOMBeers} from './beers'

const searchForm = document.querySelector('#search-form')
const searchInput = document.querySelector('.input.search')
const limitInput = document.querySelector('.input.limit')
const yearInput = document.querySelector('.input.year')
searchForm.addEventListener('submit', (evt) => {
	evt.preventDefault()
	renderDOMBeers(searchInput.value, limitInput.value, yearInput.value)
})