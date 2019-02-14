import api from './api'
const { addLikes, getBeersDetail } = api()
 export const drawLikes = async () => {
    const getIds = document.querySelectorAll('.card')
    getIds.forEach((element) => {
        const elementId = element.getAttribute('id')
        console.log('VALOR CADENA ID: ', '#' + elementId + ' .icon')
        const likeButton = document.querySelector('#' + elementId + ' .icon')
        likeButton.addEventListener('click', async (evt) => {    
            const cleanId = elementId.substr(1)
            await addLikes(cleanId)
            const getLikes = await getBeersDetail(cleanId)
            const {beer: { likes }} = getLikes
            document.querySelector('#_' + cleanId + ' .likes').innerHTML = likes + ' likes'
        })  
    })
}