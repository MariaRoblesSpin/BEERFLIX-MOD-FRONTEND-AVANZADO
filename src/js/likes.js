import api from './api'

const likeButton = document.querySelector('.icon')
const goodId = likeButton.parentElement.getAttribute('id')
const likeContainer = document.querySelector( goodId + ` .rating-container`)

console.log('Valor goodID: ', goodId)

// const likeTemplate = ({likes}) => `
//     <button class="icon">
//         <i class="fas fa-heart fa-2x"></i>
//     </button>
//     <span class="likes">${likes} likes</span>
//     `

likeButton.addEventListener('click', async (evt) => {
    evt.preventDefault()

    const addLike = await addLikes(id)
    const getLikes = await getBeersDetail(id)
    console.log('valores likes: ', getLikes)
    //const allLikes = getLikes.beer.comment 
    //likeContainer.insertAdjacentHTML("afterbegin", likeTemplate(getLikes))
})