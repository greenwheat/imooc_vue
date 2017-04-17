import Vue from 'vue'
import Router from 'vue-router'
import Goods from '@/components/goods'
import Star from '@/components/star'
import Seller from '@/components/seller'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Goods',
    component: Goods
  }, {
    path: '/star',
    name: 'Star',
    component: Star
  }, {
    path: '/seller',
    name: 'Seller',
    component: Seller
  }]
})
