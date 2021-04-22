import dataService from './data-service'

const trackService = {}

trackService.search = function (q) {
  const type = 'track'

  return dataService.get('', {
    params: { q, type }
  })
    .then(res => res.data)
}
trackService.searchCarcater =function (q,id){
    const type = 'track';
    console.log(dataService._baseUrl)
    var url = dataService
    url._baseUrl ="http://swapi.dev/api/people"
    url._baseUrl = url._baseUrl+`/${id}`
    return url.get('',{
        params:{q,type}
    })
    .then(res=>res.data)
}   

export default trackService