<!--
 * @Descripttion:
 * @version: 1.0.0
 * @Author: zhuxuxi
 * @Date: 2021-06-28 17:29:58
 * @LastEditTime: 2022-04-07 12:21:59
-->

## 1.项目说明

- 风暴潮预警体系三维可视化大屏

## 2.访问地址

- [代码仓库地址](http://gitlab.gdhqx.cn:8085/xs2021008/web-front)
- [本地打开地址](http://localhost:9527)

## 3.技术栈

- vue
- vuex
- axios 请求拦截
- cesium 1.63.1 // npm install --save cesium@1.63.1 (天地图地形数据仅支持这个版本)
- echarts
- es6+
- babel6 //es6 编译
- ElementUI //es6 编译
- 代理配置

## 4.目录结构

```

├── src                         // 源码
│   ├── api                    // 请求接口api @/api (默认index.js)
│   ├── assets                 // 图片
│   ├── styles                 // 样式
│   ├── components             // 组件
│   ├── directive              // 自定义指令
│   ├── filters                // 过滤器
│   ├── router                 // 路由   @/router (默认index.js)
│   ├── store                  // vuex存储  @/store (默认index.js)
│   ├── utils                  // 工具类 axios请求文件
│   ├── views                  // 页面
│   ├── App                    // 入口
│   ├── main                   // 主方法
│   ├── settings                 // 配置信息
└──  vue.config                //运行环境配置

```

## 5.项目文档

- [后端 API](暂无)
- [需求文档](暂无)

## 6.项目运行

```
npm i
npm run dev (开发环境dev)

```

## 7.项目发布

```
npm run build

```
