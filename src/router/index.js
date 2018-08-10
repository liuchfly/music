import Vue from 'vue'
import router from 'vue-router'

import Singer from '@/components/singer/singer'
import Search from '@/components/search/search'
import Recommend from '@/components/recommend/recommend'
import Rank from '@/components/rank/rank'
import SingerDetail from '@/components/singer-detail/singer-detail'
import Person from '@/components/person/person'


Vue.use(router)

export default new router({
  routes: [
    { path: '/', redirect:'./recommend'},
    {path: '/singer',name:'Singer',component:Singer,
      children:[
        { path:':id',
          component:SingerDetail
        }
      ]
    },
    {path: '/search',name:'Search',component:Search},
    {path: '/recommend',name:'Recommend',component:Recommend},
    { path: '/rank', name:'Rank',component:Rank},
    { path: '/person', name: 'Person', component: Person}
  ]
})
