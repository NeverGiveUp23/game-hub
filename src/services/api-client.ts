import axios from "axios";

const API_KEY = 'b7bbaf190c6846e09febbbdb8c275dd6'


export default axios.create({
  baseURL: 'https://api.rawg.io/api',
  params: {
    key: API_KEY
  }
})
