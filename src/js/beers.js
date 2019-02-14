import striptags from 'striptags'
import {openHeader} from './ui'
import api from './api'
import defaultImg from '../images/default.jpg'
import {drawLikes} from './likes'
const { getBeers } = api()


const templateBeer = ({beerId, name, image, description, likes, principal}) =>  
    `<div id="_${beerId}" class="card ${principal ? 'principal': 'secondary close'}">
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
                    <i class="fas fa-heart fa-2x"></i>
                </button>
                <span class="likes">${likes} likes</span>
            </div>
        </div>
        </div>
    </div> `
const renderBeersHome = (element, datos) => {
    const {beers} = datos 
    const htmlBeers = beers.slice(0, 8).map( (beer, index) => {
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
const renderQueryBeers = (element, datos, query, number) => {
    if (query !== '') {
        var htmlBeers 
        const {beers} = datos
        if (number > 0) {
            htmlBeers = beers.slice(0, number).map( beer => templateBeer(beer)).join('')
            element.innerHTML =  htmlBeers
            //console.log(htmlBeers)
        } else if (number <= 0 || number === undefined){
        console.log('Valor de beers: ', beers)
            htmlBeers = beers.map( beer => templateBeer(beer)).join('')
            element.innerHTML =  htmlBeers
        }
        const headers = document.querySelectorAll('.card.secondary .card-header')
        headers.forEach((header) => {
            const id = header.parentNode.getAttribute('id')
            header.addEventListener('click', openHeader(id))
        })
    }
}
export const renderDOMBeers = async (query, number) => {
    try {
        const fetchBeers = await getBeers(query, number)
        const showSection = document.getElementById('show-section')
        if (query) {
            renderQueryBeers(showSection, fetchBeers, query, number)
            drawLikes()
        } else {
            renderBeersHome(showSection, fetchBeers)
            drawLikes()
        }
    } catch (err) {
        console.log(err)
    }
}



renderDOMBeers()






