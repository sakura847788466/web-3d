/*
 * @Descripttion: This is one of the pages for object
 * @version: 1.0
 * @Author: Ada
 * @Date: 2021-11-22 09:42:33
 * @LastEditors: Ada
 * @LastEditTime: 2022-04-08 09:57:37
 */
/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
let newRoute = []
function hasPermission(roles, route) {
    if (route.meta && route.meta.roles) {
        return route.meta.roles.indexOf(roles) >= 0 
    } else {
        return true
    }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
export const filterAsyncRouter = (asyncRouterMap, roles) => {
    const newRouter = []
    asyncRouterMap.forEach(route => {
        const newRoute = { ...route }
        if (hasPermission(roles, newRoute)) {
            if (newRoute.children) {
                newRoute.children = filterAsyncRouter(newRoute.children, roles)
            }
            newRouter.push(newRoute)
        }
    })
    return newRouter
}

export default newRoute