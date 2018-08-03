import Vue from 'vue'
import Router from 'vue-router'

import Singer from '@/components/singer/singer'
import Search from '@/components/search/search'
import Recommend from '@/components/recommend/recommend'
import Rank from '@/components/rank/rank'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect:'./recommend'},
    {path: '/singer',name:'Singer',component:Singer},
    {path: '/search',name:'Search',component:Search},
    {path: '/recommend',name:'Recommend',component:Recommend},
    {path :'/rank',name:'ranm',component:Rank}
  ]
})
