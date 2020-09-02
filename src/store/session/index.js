import { LocalStorage } from 'quasar';

import { axiosInstance } from 'boot/axios';

const actions = {
  /**
   * Usado para logar o usuario no sistema.
   *
   * @param {Object} context Metodos vuex (passado automaticamente)
   * @param {Object} payload Dados do formulario {usuario, senha}
   */
  async loginUser(context, payload) {
    const { data } = await axiosInstance
      .post('/login', payload)
      .catch((error) => {
        throw new Error(error.message);
      });

    LocalStorage.set('token', data.token);

    // Coloca o token no header de cada requisição
    axiosInstance.defaults.headers.common['X-Api-Key'] = data.token;

    this.$router.push('/');
  },
  /**
   * Usado para deslogar o usuario do sistema.
   */
  async logoutUser() {
    LocalStorage.remove('token');

    this.dispatch('users/setUserDetails', {});

    // Remove o token do header de cada requisição
    axiosInstance.defaults.headers.common['X-Api-Key'] = '';

    this.$router.push('/login');
  },
};

const getters = {};
const mutations = {};
const state = {};

export default {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
};
