export const routes = [
  //TODO path '/' deve portare a dashboard e non a LOGIN. poi dashboard in assenza di dati nello store deve riportare alla login o permettere di navigare
  //TODO refresh della pagina non deve dare ACCESS DENIED ma conservare la sessione.
  
  { path: '/', redirect: '/welcome' },
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
    path: '/welcome',
    name: 'welcome',
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
