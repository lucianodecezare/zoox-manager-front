import { LocalStorage } from 'quasar';

import { axiosInstance } from 'boot/axios';

export default ({ router }) => {
  router.beforeEach((to, _, next) => {
    const requiredAuth = to.matched.some((record) => record.meta.authRequired);
    const token = LocalStorage.getItem('token');

    if (requiredAuth) {
      if (token) {
        axiosInstance.defaults.headers.common['X-Api-Key'] = token;

        next();
      } else {
        next('/login');
      }
    } else {
      next();
    }
  });
};
