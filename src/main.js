/*
 * @Descripttion: commonVueTemplate
 * @version: 1.0
 * @Author: Ada
 * @Date: 2021-10-27 14:51:26
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-15 13:18:55
 */
import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"

import "@/utils/elementUI"
import "@/styles/common.scss"
import "@wushi/dawn-map/lib/dawn-map.css"
import DawnMap from "@wushi/dawn-map"
import LetheComponents from "@lethe/components"
import "@lethe/components/es/index.css"
import * as filters from "./filters" // global filters
import './styles/font/font.css'
// global.baseUrl = 'http://192.168.2.17:8030'
//http://192.168.5.75:8030
Vue.config.productionTip = false

Array.prototype.remove = function(val) {
  var index = this.indexOf(val)
  if (index > -1) {
    this.splice(index, 1)
  }
}

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

let vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Vue.use(DawnMap).use(LetheComponents)
export default vue
