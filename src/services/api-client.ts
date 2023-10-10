import axios from "axios";


export default axios.create({
  baseURL: 'https://api.rawg.io/api',
  params: {
    key: 'b7bbaf190c6846e09febbbdb8c275dd6'
  }
})