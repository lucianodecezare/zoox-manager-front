import { LocalStorage } from 'quasar';

import { languages } from './data';

const actions = {
  changeSelectedLocale({ commit }, payload) {
    commit('changeSelectedLocale', payload);
  },
};

const getters = {
  languages: (state) => state.languages,
  selectedLocale: (state) => state.selectedLocale,
};

const mutations = {
  changeSelectedLocale(state, payload) {
    LocalStorage.set('locale', payload.locale);

    state.selectedLocale = payload;
  },
};

const state = {
  languages,
  selectedLocale: '',
};

export default {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
};
