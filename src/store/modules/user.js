/*
 * @Descripttion: This is one of the pages for object
 * @version: 1.0
 * @Author: Ada
 * @Date: 2021-11-12 10:44:38
 * @LastEditors: Ada
 * @LastEditTime: 2022-04-08 10:05:12
 */
import {
    setStore,
    getStore
} from '@/utils/store'

const user = {
    state: {
        siteList: getStore({
            name: 'siteList'
        }) || [],
    },
    actions: {
        // 存储站点列表
        saveSiteList({ commit }, params) {
            commit('SETSITELIST', params)
        },
    },
    mutations: {
        SETSITELIST: (state, params) => {
            state.siteList = params
            setStore({
                name: 'siteList',
                content: state.siteList,
                type: 'session'
            })
        },
    }
}
export default user