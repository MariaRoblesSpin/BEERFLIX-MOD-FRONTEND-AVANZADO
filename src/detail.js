import './styles/detail.scss'
import api from './js/api'
import { renderAllComments } from './js/commentForm'
import defaultImg from './images/default.jpg'
const { getBeersDetail } = api()

const detailTemplate = ({beer: {beerId, name, description, image}}) => {
	return `
	<header id="${beerId}">
		<div class="title-section">
			<h1>${name}</h1>
		</div>
		<div class="image-container">
			<img src="${image ? image : defaultImg}">
		</div>
	</header>
	<div class="content">
		${description}
	</div>
`;
}
const renderDetail = async () => {
	try {
        const [, id] = window.location.search ? window.location.search.split('=') : []
		const oneBeer = await getBeersDetail(id)
		const beerHTML = detailTemplate(oneBeer)
		document.getElementById('detail').innerHTML = beerHTML

	} catch(err){
		console.error(err)
	}
}
renderDetail()
renderAllComments()

console.log('detail!!!!!!!!!!')