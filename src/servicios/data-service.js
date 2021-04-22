import trae from 'trae'
import configService from './config'

const dataService = trae.create({
  baseUrl: configService.apiUrl
})

export default dataService