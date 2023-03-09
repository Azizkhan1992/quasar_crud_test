import Vue from 'vue'
import axios from 'axios'

// Vue.use(axios)

const api = axios.create({
  baseURL: 'http://94.158.54.194:9092/api/'
})

Vue.prototype.$axios = api
export { api }
