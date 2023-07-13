import { createRouter, createWebHistory } from 'vue-router'

import Login from "@/views/Login";
import Layout from "@/layout/Layout";



const routes = [
  {
    path: '/',
    name: 'layout',
    component: Layout,
    redirect:"/home",
    children:[
      {
        path: '/eventInfo',
        name: 'eventInfo',
        component:()=>import("@/views/eventInfo.vue"),

      },
      {
        path: '/oldPersonInfo',
        name: 'oldPersonInfo',
        component: ()=>import("@/views/oldPersonInfo.vue"),
      },
      {
        path: '/employeeInfo',
        name: 'employeeInfo',
        component: ()=>import("@/views/employeeInfo.vue")
      },
      {
        path: '/volunteerInfo',
        name: 'volunteerInfo',
        component: ()=>import("@/views/volunteerInfo.vue")
      },
      {
        path: '/home',
        name: 'home',
        component: ()=>import("@/views/home")
      },
      {
        path: '/oldPeopleView',
        name: 'oldPeopleView',
        component: ()=>import("@/views/oldPeopleView.vue")
      },
      {
        path: '/sysUser',
        name: 'sysUser',
        component: ()=>import("@/views/sysUser.vue")
      },



    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },

  {
    path: '/:pathMatch(.*)',
    name: '404',
    component: ()=>import("@/views/404")
  },

]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
/*// 注意：刷新页面会导致页面路由重置
export const setRoutes = () => {
  const storeMenus = localStorage.getItem("menu");
  if (storeMenus) {
    // 拼装动态路由
    const manageRoute = { path: '/', name: 'layout', component:Layout, redirect: "/home", children: [
        {
          path: '/home',
          name: 'home',
          component: ()=>import('@/views/home.vue')
        },
      ] }
    const menus = JSON.parse(storeMenus)
    menus.forEach(item => {
      if (item.path) {  // 当且仅当path不为空的时候才去设置路由
        let itemMenu = { path: item.path, name: item.name, component: () => import('../views/' + item.path.replace("/", "") + '.vue')}
        manageRoute.children.push(itemMenu)
      } else if(item.children.length) {
        item.children.forEach(item => {
          if (item.path) {
            let itemMenu = { path: item.path, name: item.name, component: () => import('../views/' + item.path.replace("/", "") + '.vue')}
            manageRoute.children.push(itemMenu)
          }
        })
      }
    })

    // 获取当前的路由对象名称数组
      router.addRoute(manageRoute)

  }
}

setRoutes();*/



export default router
