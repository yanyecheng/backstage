import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('@/views/land/login.vue')
  },
  {
    path:'/home',
    component:() => import('@/views/home.vue'),
    children:[
      {
        path:'users',
        component:()=> import('@/views/sidebar/users.vue')
      },
      {
        path: 'rights',
        component: () => import('@/views/sidebar/rights.vue')
      },
      {
        path: 'goods',
        component: () => import('@/views/sidebar/goods.vue')
      },
      {
        path: 'reports',
        component: () => import('@/views/sidebar/reports.vue')
      },
      {
        path: 'orders',
        component: () => import('@/views/sidebar/orders.vue')
      },
      {
        path: 'roles',
        component: () => import('@/views/sidebar/roles.vue')
      },
       {
         path: 'params',
         component: () => import('@/views/sidebar/params.vue')
       },
        {
          path: 'categories',
          component: () => import('@/views/sidebar/categories.vue')
        },
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router