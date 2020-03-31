import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/reset.css'
import '@/styles/transition.scss'
import './assets/iconfont/iconfont.css'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/zh-CN' 

//路由守卫 
import '@/permission'

Vue.config.productionTip = false

Vue.use(ElementUI, { locale })

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
