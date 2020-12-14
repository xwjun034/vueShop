import Vue from "vue";
import VueRouter from "vue-router";
//import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  // {
  //   path: "/",
  //   name: "home",
  //   component: () => import("@/views/main"), //路由懒加载解决首屏加载慢，性能优化
  //   redirect:"/index",
  // }
  {
    path: '/',
    name: 'tabbar',
    component: () => import("@/views/tabbar.vue"),
    redirect: "/index", // 重定向
    children: [{
        path: '/index',
        name: 'index',
        component: () => import('@/views/index')
      },
      {
        path: '/cart',
        name: 'cart',
        component: () => import('@/views/cart')
      },
      {
        path: '/mine',
        name: 'mine',
        component: () => import('@/views/mine')
      }
    ],  
  },
  {
    path:'/goods/classify',
    name:'classify',
    component:() => import('@/views/goods/classify'),
    redirect:'/goods/classify-item',
    children:[
      {
        path:'/goods/classify-item',
        name:'classify-item',
        component:() => import('@/views/goods/classify-item')
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;