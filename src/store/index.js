import Vue from 'vue'
import Vuex from 'vuex'
import { storage } from "../utils/storage";


Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        token: '',
    },
    mutations: {
        setToken: (state, token) => {
            state.token = token
        },

    },
    getters: {
        token: state => {
            return state.token
        },

    },
    actions: {
        Logout: ({ commit }) => {
            storage.removeStroe(storage.access_token);
            storage.removeStroe(storage.token_type);
            commit('setToken','')
        },
        getToken({ commit }, token){
            commit('setToken', token)
        },
    }
})

export default store
