import { 
  createRouter, 
  // createWebHashHistory,
  createWebHistory,
  RouteRecordRaw 
} from 'vue-router';
import Login from '../views/Login.vue';
import Home from '../views/Home.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: { name: 'Login' }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/home',
    name: 'Home',
    redirect: '/dashboard',
    component: Home,
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('../views/Dashboard.vue'),
        meta: {
          title: '儀錶板',
          isShow: true,
          icon: 'fa-solid fa-border-all',
          index: 1
        }
      },
      {
        path: 'table',
        name: 'Table',
        component: () => import('../views/Table.vue'),
        meta: {
          title: '表單',
          isShow: true,
          icon: 'fa-solid fa-rectangle-list',
          index: 2
        }
      },
      {
        path: 'user',
        name: 'User',
        component: () => import('../views/User.vue'),
        meta: {
          title: '使用者',
          isShow: true,
          icon: 'fa-solid fa-user',
          index: 3
        }
      },
    ]
  },
  {
    path: '/404',
    name: 'Page404',
    component: () => import('../views/Page404.vue')
  },
];

const router = createRouter({
  // history: createWebHashHistory(),
  history: createWebHistory(),
  routes,
});

export default router;
