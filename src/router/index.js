import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Toast from '@/pages/Toast'
import MessageBox from '@/pages/MessageBox'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home
    }, {
      path: '/toast',
      name: 'Toast',
      component: Toast
    }, {
      path: '/messagebox',
      name: 'MessageBox',
      component: MessageBox
    }
  ]
})
