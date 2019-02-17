const moment = require('moment');
import './styles/detail.scss'
import api from './js/api'
import { renderAllComments } from './js/commentForm'
import defaultImg from './images/default.jpg'
import {drawLikes} from './js/likes'
const { getBeersDetail } = api()
import {openHeader} from './js/ui'


document.querySelector('.filter-wrapper').classList.add('disabled')

const detailTemplate = ({beer: {beerId, name, description, image, firstBrewed, brewersTips, contributedBy, likes}}) => `
<div id="_${beerId}" class="likes">	
	<header>
		<div class="name-section">
			<h2>${name}</h2>
		</div>
		<div class="rating-container">
			<button class="icon">
				<i class="fas fa-heart fa-2x"></i>
			</button>
			<span class="likes">${likes} likes</span>
		</div>
	</header>
	<div class="container">
		<section class="content">
			<div class="image-container">
				<img src="${image ? image : defaultImg}">
			</div>
			<div class="info-wrapper">
				<div class="info-container">
					<div class="creator">
						<h3>Creator</h3>
						<p>${contributedBy}</p>
					</div>
					<div class="date">
						<h3>First Brewed</h3>
						<p>${moment(firstBrewed,'MM-YYYY' ).format('MMMM YYYY')}</p>
					</div>
					<div class="tips">
						<p>${brewersTips}</p>
					</div>
				</div>
				<section class="description"><p>${description}</p></section>
			</div>
		</section>
		<div id="abrir" class="card secondary close">
			<header class="card-header">
				<h2>Ingredients</h2>
			</header>
			<div class="card-content">
				<h4 class="card-title">Malt</h4>
				<div class="box-container" id="malt">
				</div>
				<h4 class="card-title">Hops</h4>
				<div class="box-container" id="hops">
				</div>
				<h4 class="card-title">Yeast</h4>
				<div id="yeast">
				</div>
			</div>
		</div>
	</div>
</div>
	
	

`
const maltTemplate = ({ name, amount: {value, unit}}) => `
	<div class="box">
		<h5>${name}</h5>
		<p>${value} ${unit}</p>
	</div>
`
const hopsTemplate = ({ name, amount: {value, unit}, attribute}) => `
	<div class="box">
		<h5>${name}</h5>
		<p>${value} ${unit}</p>
		<p>${attribute}</p>
	</div>
`
const yeastTemplate = (yeast) => `
	<div class="box">
		<h5>${yeast}</h5>
	</div>
`
const renderDetail = async () => {
	try {
        const [, id] = window.location.search ? window.location.search.split('=') : []
		const oneBeer = await getBeersDetail(id)
		const beerHTML = detailTemplate(oneBeer)
		document.getElementById('detail').innerHTML = beerHTML
		const { beer:{ ingredients: {malt, hops, yeast} } } = oneBeer

		malt.forEach(element => {
			document.getElementById('malt').insertAdjacentHTML("beforeend", maltTemplate(element)) 
		});

		hops.forEach(element => {
			document.getElementById('hops').insertAdjacentHTML("beforeend", hopsTemplate(element)) 
		});
		document.getElementById('yeast').insertAdjacentHTML("beforeend", yeastTemplate(yeast))
		drawLikes('.likes')
		const header = document.querySelector('.card.secondary .card-header')
		const headerId = header.parentNode.getAttribute('id')
		header.addEventListener('click', openHeader(headerId))
	} catch(err){
		console.error(err)
	}
}
renderDetail()
renderAllComments()
