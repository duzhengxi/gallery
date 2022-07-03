export default [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/main/index.vue')
  },
  {
    path: '/pins/:id',
    name: 'pins',
    component: () => import('@/views/pins/index.vue'),
    children: []
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login_register/login/index.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/login_register/register/index.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/profile/index.vue'),
    meta: { user: true }
  },
  {
    path: '/member',
    name: 'member',
    component: () => import('@/views/member/index.vue'),
    meta: { user: true } // 需要登录才可以访问
  }
]
