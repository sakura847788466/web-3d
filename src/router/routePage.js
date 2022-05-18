/*
 * @Descripttion: This is one of the pages for object
 * @version: 1.0
 * @Author: Ada
 * @Date: 2021-11-22 10:34:34
 * @LastEditors: Ada
 * @LastEditTime: 2022-04-08 12:41:08
 */
//页面共用路由
import Layout from '@/layout/index'

export const constantRouterMap = [
    {
        path: '/',
        redirect: '/main'
    },
    {
        path: '/main',
        name: 'main',
        component: Layout,
        redirect: '/main/monitor',
        // component: () => import ('@/views/Main/index.vue'),
        children:[{
            path: 'monitor',
            name: 'monitor',
            component: () => import ('@/views/Main/index.vue'),
        },{
            path: 'forecast',
            name: 'forecast',
            component: () => import ('@/views/Forecast/index.vue'),
        }]
    }
]
