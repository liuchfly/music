// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "babel-polyfill"
import Vue from 'vue'
import App from './App'
import router from './router'
import Fastclick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'


import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.use(VueLazyLoad,{
  loading: require('common/imgage/default.png')
})
Vue.use(MintUI)



// 引入css文件
import  './common/base.css'
// 处理移动端300毫秒延时
Fastclick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  render: h=>h(App)
})
