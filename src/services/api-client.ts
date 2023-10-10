import axios from "axios";

const API_KEY = 'API_KEY'


export default axios.create({
  baseURL: 'https://api.rawg.io/api',
  params: {
    key: API_KEY
  }
})
