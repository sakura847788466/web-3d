/*
 * @Descripttion: vuex入口文件
 * @version: 1.0
 * @Author: Ada
 * @Date: 2022-04-07 13:37:51
 * @LastEditors: Ada
 * @LastEditTime: 2022-04-08 09:57:21
 */
import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import getters from './getter'

Vue.use(Vuex)
const store = new Vuex.Store({
    modules: {
        user
    },
    getters
})

export default store
