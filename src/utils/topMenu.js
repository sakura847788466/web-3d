/*
 * @Descripttion: This is one of the pages for object
 * @version: 1.0
 * @Author: Ada
 * @Date: 2021-11-16 10:29:49
 * @LastEditors: Ada
 * @LastEditTime: 2021-11-16 11:23:23
 */
// 设置导航栏
const pageRoutes = [
  {
    path: '/index/observeData',
    name: 'observeData',
    component: () => import ('../views/Index.vue'),
    children: [
      {
        path: '/index/observeData',
        name: '实测数据',
        component: () => import ('../views/ObserveData/ObserveData.vue'),
        meta: {
          hasRole: ['1', '2', '3'],
        },
      },
      {
        path: '/index/remoteData',
        name: '遥感数据',
        component: () => import ('../views/RemoteData/RemoteData.vue'),
        meta: {
          hasRole: ['1', '2', '3'],
        },
      },
      {
        path: '/index/dataManagement',
        name: '数据管理',
        component: () => import ('../views/DataManagement/DataManagement.vue'),
        meta: {
          hasRole: ['1', '2'],
        },
      },
      {
        path: '/index/system',
        name: '系统管理',
        component: () => import ('../views/System/System.vue'),
        meta: {
          hasRole: ['1'],
        },
      },
    ],
  },
];
//新路由生成
export const getNewRoute = roleId => {
let newRouter = [];

  pageRoutes[0].children.forEach ((item, index) => {
    if (item.meta.hasRole.includes (roleId)) {
      newRouter.push (item);
    }
  });
  pageRoutes[0].children = newRouter;
  return pageRoutes;
};
// 新导航菜单
export const getTopMenu = roleId => {
  let menu = []
  pageRoutes[0].children.forEach ((item, index) => {
    if (item.meta.hasRole.includes (roleId)) {
      let menuItem = {
        label: item.name,
        path: item.path,
      };
      menu.push (menuItem);
    }
  });
  return menu;
};
