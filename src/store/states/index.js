import { getField, updateField } from 'vuex-map-fields';

import { axiosInstance } from 'boot/axios';

const API_ROUTE = '/states';

const actions = {
  async createState({ commit, state }) {
    commit('setLoadingStates', true);

    await axiosInstance.post(API_ROUTE, state.stateForm);

    commit('setLoadingStates', false);
  },
  async deleteState({ commit }, stateId) {
    commit('setLoadingStates', true);

    await axiosInstance.delete(`${API_ROUTE}/${stateId}`);

    commit('setLoadingStates', false);
  },
  async getState({ commit }, stateId) {
    commit('setLoadingStates', true);

    const { data } = await axiosInstance.get(`${API_ROUTE}/${stateId}`);

    commit('setLoadingStates', false);
    commit('setStateForm', data);
  },
  async getStates({ commit }, tableOptions) {
    const {
      descending,
      filter,
      page,
      rowsPerPage,
      sortBy,
    } = tableOptions;

    commit('setLoadingStates', true);

    const { data } = await axiosInstance.get(
      `${API_ROUTE}?page=${page}&order=${sortBy}&limit=${rowsPerPage}&filter=${filter}&descending=${descending}`,
    );

    commit('setLoadingStates', false);
    commit('setStates', data.estados);

    return data.count;
  },
  resetStateForm({ commit }) {
    commit('resetStateForm');
  },
  async updateState({ commit, state }, stateId) {
    commit('setLoadingStates', true);

    await axiosInstance.put(`${API_ROUTE}/${stateId}`, state.stateForm);

    commit('setLoadingStates', false);
  },
};

const getters = {
  getField,
  loadingStates: (state) => state.loadingStates,
  stateForm: (state) => state.stateForm,
  states: (state) => state.states,
};

const mutations = {
  resetStateForm(state) {
    state.stateForm = {
      _id: null,
      nome: '',
      abreviacao: '',
    };
  },
  setLoadingStates(state, payload) {
    state.loadingStates = payload;
  },
  setStateForm(state, payload) {
    state.stateForm = {
      _id: payload._id,
      nome: payload.nome,
      abreviacao: payload.abreviacao,
    };
  },
  setStates(state, payload) {
    state.states = payload;
  },
  updateField,
};

const state = {
  loadingStates: false,
  stateForm: {
    _id: null,
    nome: '',
    abreviacao: '',
  },
  states: [],
};

export default {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
};
