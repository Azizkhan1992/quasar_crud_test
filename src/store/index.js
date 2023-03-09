import Vue from 'vue'
import Vuex from 'vuex'
import { api } from 'boot/axios'

// import example from './module-example'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    state: {
      productTypes: '',
      products: ''
    },
    actions: {
      async getAllProducts ({commit}) {
        return api.get('/product')
          .then((resp) => {
            if (resp) {
              commit('changeProducts', resp.data)
              return resp.data
            }
          })
      },
      async getProductTypes({commit}){
        return api.get('/product/get-product-types')
        .then(resp => {
          commit('changeProductTypes', resp.data)
          return resp.data
        })
      },
      async createProduct({commit}, data){
        return api.post('/product', data)
        .then(resp => {
          commit('changeProducts', resp.data)
          return resp.data
        })
      },
      async updateProduct({commit}, data){
        return api.put('/product', data)
        .then(resp => {
          commit('changeProducts', resp.data)
          return resp.data
        })
      },
      async deleteSingleProduct({commit}, product_id){
        return api.delete(`/product/${product_id}`)
        .then(resp => {
          commit('changeProducts', resp.data)
          return resp.data
        })
      }
    },
    mutations: {
      changeProductTypes(state, data){
        state.productTypes = data
      },
      changeProducts(state, data){
        state.products = data
      }
    },
    getters: {},

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEBUGGING
  })

  return Store
}
