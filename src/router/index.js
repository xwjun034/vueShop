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
        component: () => import('@/views/index') // 路由懒加载解决首屏加载慢 性能优化
      },
      {
        path: '/cart',
        name: 'cart',
        component: () => import('@/views/cart')
      },
      {
        path: '/mine',
        name: 'mine',
        component: () => import('@/views/mine'),
        meta:{auth:true}
      }
    ],  
  },

  {
    path:'/goods/classify',
    name:'classify',
    component:() => import('@/views/goods/classify'),
    redirect:'/goods/classify-item', //页面重定向
    children:[
      {
        path:'/goods/classify-item',
        name:'classify-item',
        component:() => import('@/views/goods/classify-item')
      }
    ]
  },
  {
    path:'/goods/search',
    name:'search',
    component:()=>import('@/views/goods/search')
  },
  {
    path:'/goods/details',
    name:'details',
    component:()=>import('@/views/goods/details'),
    redirect: '/goods/details/item',
    children:[
      {
        path:'content',
        name:'details-content',
        component:()=>import('@/views/goods/details-content')
      },
      {
        path:'item',
        name:'details-item',
        component:()=>import('@/views/goods/details-item')
      },
      {
        path:'review',
        name:'details-review',
        component:()=>import('@/views/goods/details-review')
      }
    ]
  },
  {
    path:'/login',
    name:'login',
    component:()=>import('@/views/login')
  },
  {
    path:'/reg',
    name:'reg',
    component:()=>import('@/views/reg')
  },
  {
    path:'/order',
    name:'order',
    component:()=>import('@/views/order') 
  },
  {
    path:'/ban',
    name:'ban',
    component:()=>import('@/views/ban')
  }
];


const router = new VueRouter({
  mode: "history", // history 没有# hash哈希 带#
  base: process.env.BASE_URL, //自动获取目录路径
  routes
});
// 路由守卫
// router.beforeEach((to,from,next)=>{
//  if(to.meta.auth){
//     if(Boolean(localStorage['isLogin'])){
//        next()
//     }else{
//       next('/login')
//     }
//  }else{
//   next()
//  }
// });

router.afterEach( (to,from) => {
   console.log('to',to);
   console.log('from',from)
});
export default router;