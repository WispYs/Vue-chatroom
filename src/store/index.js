import Vue from 'vue'
import Vuex from 'vuex'
// import mutations from './mutations'
// import actions from './action'
import getters from './getters'
import * as mutations from './mutations'
import * as actions from './action'

Vue.use(Vuex)

const state = {
    username: '',
    test: 'test'
}
const store = new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})