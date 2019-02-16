import api from './api'
const moment = require('moment');
const {createComment, getBeersDetail} = api()
console.log('Entra en quote form ')
const commentForm = document.getElementById('comments-form')
const commentInput = document.getElementById('comment')

const commentTemplate = ({ comment, dateComment }) =>  `
    <div class="list-item">
        <p>${comment}</p>
        <p class="date">${moment(dateComment).format('MMMM Do YYYY, h:mm:ss a')}</p>
    </div>
`

commentInput.addEventListener('change', (evt) => {
commentInput.value = evt.target.value
})

commentForm.addEventListener('submit', async (evt) => {
    evt.preventDefault()
    try{
        const [, id] = window.location.search ? window.location.search.split('=') : []
        const comment = await createComment(id, commentInput.value)
        const getComments = await getBeersDetail(id)
        const allComments = getComments.beer.comment 
        const lastComment = allComments[allComments.length - 1]
        document.getElementById('commentList').insertAdjacentHTML("afterbegin", commentTemplate(lastComment))  
    }catch(err){
        console.error(err)
    }
})

export const renderAllComments = async () => {
    try {
        const [, id] = window.location.search ? window.location.search.split('=') : []
        const getComments = await getBeersDetail(id)
        const allComments = getComments.beer.comment 
        if (allComments) {
            allComments.forEach( comment => {
                document.getElementById('commentList').insertAdjacentHTML("afterbegin", commentTemplate(comment))  
            })
        }
    } catch(err) {
        console.error(err)
    }
}  


