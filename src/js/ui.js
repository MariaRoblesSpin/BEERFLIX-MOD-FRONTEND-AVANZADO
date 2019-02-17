const navbar = document.getElementById('navbar')
const searchIcon = document.getElementById('navbar-search') 
const closeIcon = document.getElementById('navbar-close') 

const toggle = elemento => (removeClass, addClass) => {
	elemento.classList.remove(removeClass)
	elemento.classList.add(addClass)
}
const navbarVariable = toggle(navbar)

searchIcon.addEventListener('click', () => {
	navbarVariable('no-search', 'search')
})
closeIcon.addEventListener('click', () => {
	navbarVariable('search', 'no-search')
})

const openHeader = (id) => () => {
	const elemento = document.getElementById(id)
	elemento.classList.toggle('close')
}
// const testCard = document.getElementById('test-card')
// testCard.addEventListener('click', openHeader('test-card'))

export {
	openHeader
}