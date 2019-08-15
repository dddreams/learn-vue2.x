import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
    {path: '/error', component: () => import('@/views/error')},

    {path: '/', redirect:'/login'},
    {path: '/exit', redirect:'/login'},

    {path: '/login', component: () => import('@/views/login')},
    {
        path: '/index',
        name: 'index',
        component: () => import('@/views/index'),
        meta:{ isIndex: true}
    }
]

const createRouter = () => new Router({
    routes: routes
})

const router = createRouter()

export default router

