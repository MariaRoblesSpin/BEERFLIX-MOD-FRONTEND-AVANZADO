const moment = require('moment');
import './styles/detail.scss'
import api from './js/api'
import { renderAllComments } from './js/commentForm'
import defaultImg from './images/default.jpg'
const { getBeersDetail } = api()



const detailTemplate = ({beer: {beerId, name, description, image, firstBrewed, brewersTips, contributedBy}}) => `
	<header id="${beerId}">
		<div class="name-section">
			<h2>${name}</h2>
		</div>
		<div class="image-container">
			<img src="${image ? image : defaultImg}">
		</div>
	</header>
	<section class="content">
		<p>${description}</p>
		<div class="creator">
			<h3>Creator: </h3>
			<p>${contributedBy}</p>
		</div>
		<div class="date">
			<h3>First Brewed: </h3>
			<p>${moment(firstBrewed,'MM-YYYY' ).format('MMMM YYYY')}</p>
		</div>
		<div class="tips">
			<h3>Tips</h3>
			<p>${brewersTips}</p>
		</div>
		<div id="ingredients">
			<h3>Ingredients</h3>
		</div>
	</section>
`
const ingredientsTemplate = ({ malt:{name, amount: {value}}, hops, yeast }) => `
	<div class="ingredient malt">
		<h4>Malt</h4>
		<h5>${malt.name}</h5>
		<h5>${malt.amount.value} ${malt.amount.unit}</h5>
	</div>
`
const renderDetail = async () => {
	try {
        const [, id] = window.location.search ? window.location.search.split('=') : []
		const oneBeer = await getBeersDetail(id)
		const beerHTML = detailTemplate(oneBeer)
		document.getElementById('detail').innerHTML = beerHTML
		const { beer:{ ingredients } } = oneBeer
		console.log('ingredientes', ingredients)
		const ingredientsHTML = ingredientsTemplate(ingredients)
		document.getElementById('ingredients').innerHTML = ingredientsHTML

	} catch(err){
		console.error(err)
	}
}
renderDetail()
renderAllComments()

console.log('detail!!!!!!!!!!')