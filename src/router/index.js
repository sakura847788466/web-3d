/*
 * @Descripttion: 路由配置表
 * @version: 1.0
 * @Author: Ada
 * @Date: 2021-10-27 14:51:26
 * @LastEditors: Ada
 * @LastEditTime: 2022-04-07 12:25:35
 */
import Vue from 'vue'
import Router from 'vue-router'
import { constantRouterMap,asyncRouterMap} from './routePage'
Vue.use (Router)


const router = new Router ({
    // mode: 'history',
    base: process.env.BASE_URL,
    routes: [...constantRouterMap]
})

export default router
