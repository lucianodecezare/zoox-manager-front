const routes = [
  {
    path: '/login',
    component: () => import('layouts/Login.vue'),
    children: [
      { path: '', component: () => import('pages/Login.vue') },
    ],
  },
  {
    path: '/',
    component: () => import('layouts/Main.vue'),
    meta: {
      authRequired: true,
    },
    children: [
      { path: '/', component: () => import('pages/Index.vue') },
      { path: '/cidades', component: () => import('pages/Cities.vue') },
      { path: '/estados', component: () => import('pages/States.vue') },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
