export const routes = [
  { path: '/', redirect: '/login' },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/pages/dashboard.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/pages/register.vue')
  },
  {
    path: '/login',
    component: () => import('@/pages/login.vue'),
    // children: [
    //   {
    //     path: 'login',
    //     component: () => import('@/pages/login.vue'),
    //   },
    //   {
    //     path: 'register',
    //     component: () => import('@/pages/register.vue'),
    //   },
    //   {
    //     path: '/:pathMatch(.*)*',
    //     component: () => import('@/pages/[...error].vue'),
    //   },
    // ],
  },
]
