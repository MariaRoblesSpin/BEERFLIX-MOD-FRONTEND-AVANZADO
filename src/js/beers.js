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
const renderQueryBeers = (element, datos, query) => {
    if (query !== '') {
        var htmlBeers = undefined
        const {beers} = datos
        if (query.indexOf('&limit=')) {
            let elements = query.split('=')
            let number = parseInt(elements.splice(1))
            htmlBeers = beers.slice(0, number).map( beer => templateBeer(beer)).join('')
        } 
        console.log('Valor de beers: ', beers)
            htmlBeers = beers.forEach( beer => {
                console.log('Valor de templateBeer: ', templateBeer(beer))
                return templateBeer(beer)
            })
        console.log(htmlBeers) // esto no lo entiendo. Sale undefined.
        
        element.innerHTML =  htmlBeers
        const headers = document.querySelectorAll('.card.secondary .card-header')
        headers.forEach((header) => {
            const id = header.parentNode.getAttribute('id')
            header.addEventListener('click', openHeader(id))
        })
    }
}
export const renderDOMBeers = async (query) => {
    try {
        const fetchBeers = await getBeers(query)
        const showSection = document.getElementById('show-section')
        if (query) {
            renderQueryBeers(showSection, fetchBeers, query)
        } else {
            renderBeersHome(showSection, fetchBeers)
        }
        
    } catch (err) {
        console.log(err)
    }
}
renderDOMBeers()