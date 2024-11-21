export const routes = [
  /*TODO (non replicabile) capire perché a volte la rotta si incanta: 
   - da login ha finito di girare la rotella con stato ok, 
     l'url diventa dashboard ma a livello grafico sei ancora sul form di login 
   - oppure da register finisci di mettere i dati li salvi finisce di girare la rotellina
     l'url diventa dashboard ma sei ancora sul form. 
----> PER LIMITARE LE CHIAMATE HTTP, conviene disabilitare il bottone 
      di login / registrazione a valle della chiamata effettuata. 
      se switcha di pagina non se ne accorge nessuno, 
      se non switcha faranno un refresh o ci chiameranno!
  
  effettuato un tentativo a modificare i vari router push con replace e back, 
  ma bisogna fare ancora tante prove per vedere se così è rientrato davvero il bug.
      */

  { path: '/', redirect: '/dashboard' },
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
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/pages/dashboard.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/pages/register.vue')
  }
  ,
  {
    path: '/registraFiglio',
    name: 'registraFiglio',
    component: () => import('@/pages/registraFiglio.vue')
  }
]
