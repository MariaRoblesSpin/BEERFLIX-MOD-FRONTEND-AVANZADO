const API_KEY = 'Q44JRAY-95DMJS6-MQ5PQPX-FPSTHG9';

const api = (API_URL = 'https://web-bootcamp-exercise-beer-api-nijliozdcg.now.sh/api/v1/beers') => {
  const SEARCH_API_URL = `${API_URL}?search=`;
  //const BEERS_URL = `${API_URL}/`;
  return {
    addLikes: async (id) => {
      try {
        await fetch(`${API_URL}/${id}/like`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            'X-API-KEY': API_KEY,
          },
        });
      } catch(err) {
        console.error(err);
        throw err;
      }
    },
    createComment: async (id, text) => {
      try {
        const response = await fetch(`${API_URL}/${id}/comment`, {
          method: 'POST',
          body: JSON.stringify({
            comment: text,
          }),
          headers: {
            'Content-type': 'application/json',
            'X-API-KEY': API_KEY,
          },
        });
        console.log('qué es esta respuesta:', response);
        const comment = await response.json();
        return comment;
      } catch (err) {
        console.error(err);
        throw err;
      }
    },
    getBeers: async (query, number, date) => {
      try {    
        const requestUrl = query ?
          `${SEARCH_API_URL}${query}&limit=${number}` :
          API_URL;
        const response = await fetch(requestUrl, {
            method: 'GET',
            headers: {
              'Content-type': 'application/json',
              'X-API-KEY': API_KEY,
            },
          }
        );
        let datos = await response.json();
        let { beers } = datos 

        if (date !== '' && date !==undefined){
          let filteredBeers = []
          for (var i = 0 ; i<beers.length; i++) {
            let year = beers[i].firstBrewed.slice(3)   
            if (date == year) {
              filteredBeers.push(beers[i]) 
            } 
          }
          beers = filteredBeers
        }
        datos.beers = beers
       
        return datos;
      } catch (err) {
        console.error(err);
        throw err;
      }
    },
    getBeersDetail: async (id) => {
      try {
        const detailSection = document.getElementById('detailSection')
        if (detailSection !== null) {
          detailSection.classList.add('loading')
        }
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'GET',
            headers: {
              'Content-type': 'application/json',
              'X-API-KEY': API_KEY,
            },
          });
        if (response && detailSection !== null) {
          detailSection.classList.remove('loading')
        } 
        const beer = await response.json();
        return beer;
      } catch(err) {
        console.error(err);
      }
    },

  };
};

export default api;
