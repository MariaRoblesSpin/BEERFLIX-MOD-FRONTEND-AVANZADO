const API_KEY = 'Q44JRAY-95DMJS6-MQ5PQPX-FPSTHG9';

const api = (API_URL = 'https://web-bootcamp-exercise-beer-api-nijliozdcg.now.sh/api/v1/beers') => {
  const SEARCH_API_URL = `${API_URL}?search=`;
  //const BEERS_URL = `${API_URL}/`;
  return {
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
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    getBeers: async (query) => {
      try {
        const requestUrl = query ?
          `${SEARCH_API_URL}${query}` :
          API_URL;
        const response = await fetch(requestUrl, {
            method: 'GET',
            headers: {
              'Content-type': 'application/json',
              'X-API-KEY': API_KEY,
            },
          }
        );
        const datos = await response.json();
        console.log('MUESTRA DATOS: ', datos)
        return datos;
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    getBeersDetail: async (id) => {
      try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'GET',
            headers: {
              'Content-type': 'application/json',
              'X-API-KEY': API_KEY,
            },
          });
          // no funciona
        // const detailSection = document.getElementById('detailSection')
        // console.log('buscando statusCode: ', response)
        // if (!response) {
        //   detailSection.classList.add('loading')
        // } else {
        //   detailSection.classList.remove('loading')
        // }
        const beer = await response.json();
        
        return beer;
      } catch(e) {
        console.error(e);
      }
    },
  };
};

export default api;
