import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout'


Vue.use(VueRouter)

const routes = [
    // 登录页
    {path: '/login', name: 'login', component: () => import('@/views/login')},
    // 主页
    {
        path: '/',
        component: Layout,
        redirect: '/category',
        children: [
            {path: '/rotation', name: 'settings', component: () => import('@/views/rotation')},
            {path: '/order', name: 'order', component: () => import('@/views/order')},
            {path: '/category', name: 'category', component: () => import('@/views/category')},
            {path: '/table-number', name: 'table-number', component: () => import('@/views/table-number')},
            {path: '/page-lo', name: 'page-lo', component: () => import('@/views/page-lo')},
            {path: '/comment', name: 'page-lo', component: () => import('@/views/comment')},
            {path: '/acl', name: 'acl', component: () => import('@/views/acl')},
            {path: '/comment', name: 'page-lo', component: () => import('@/views/comment')},
            {path: '/role', name: 'page-lo', component: () => import('@/views/role')},
        ]
    },
]

const router = new VueRouter({
    routes
})

export default router
