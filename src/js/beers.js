import striptags from 'striptags'
import {openHeader} from './ui'
import api from './api'
import defaultImg from '../images/default.jpg'
const { getBeers } = api()

const templateBeer = ({beerId, name, image, description, principal}) => 
    `<div id="${beerId}" class="card ${principal ? 'principal': 'secondary close'}">
        <header class="card-header">
        <h2><a href="http://localhost:3000/detail.html?id=${beerId}">${name}</a></h2>
        </header>
        <div class="card-content">
        <div class="card-content-image">
            <img src="${image ? image : defaultImg}"/>
        </div>
        <div class="card-content-text">
            <p>${striptags(description)}</p>
            <div class="rating-container">
            <button class="icon">
                <i class="fas fa-star"></i>
            </button>
            <button class="icon">
                <i class="far fa-star"></i>
            </button>
            <button class="icon">
                <i class="far fa-star"></i>
            </button>
            </div>
        </div>
        </div>
    </div> `
const renderBeers = (element, datos) => {
    const {beers} = datos 

    const htmlBeers = beers.slice(0, 6).map( (beer, index) => {
       if (index < 2) {
            return templateBeer({
                ...beer,
                principal: true,
            }) 
       }
        return templateBeer(beer)
    }).join('')
    element.innerHTML =  htmlBeers
    const headers = document.querySelectorAll('.card.secondary .card-header')
    headers.forEach((header) => {
        const id = header.parentNode.getAttribute('id')
        header.addEventListener('click', openHeader(id))
    })
}
export const renderDOMBeers = async (query) => {
    try {
        const fetchBeers = await getBeers(query)
        const showSection = document.getElementById('show-section')
        renderBeers(showSection, fetchBeers)
    } catch (err) {
        console.log(err)
    }
}
renderDOMBeers()