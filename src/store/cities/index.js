import { getField, updateField } from 'vuex-map-fields';

import { axiosInstance } from 'boot/axios';

const API_ROUTE = '/cities';

const actions = {
  async createCity({ commit, state }) {
    commit('setLoadingCities', true);

    await axiosInstance.post(API_ROUTE, state.cityForm);

    commit('setLoadingCities', false);
  },
  async deleteCity({ commit }, cityId) {
    commit('setLoadingCities', true);

    await axiosInstance.delete(`${API_ROUTE}/${cityId}`);

    commit('setLoadingCities', false);
  },
  async getCity({ commit }, cityId) {
    commit('setLoadingCities', true);

    const { data } = await axiosInstance.get(`${API_ROUTE}/${cityId}`);

    commit('setLoadingCities', false);
    commit('setCityForm', data);
  },
  async getCities({ commit }, tableOptions) {
    const {
      descending,
      filter,
      page,
      rowsPerPage,
      sortBy,
    } = tableOptions;

    commit('setLoadingCities', true);

    const { data } = await axiosInstance.get(
      `${API_ROUTE}?page=${page}&order=${sortBy}&limit=${rowsPerPage}&filter=${filter}&descending=${descending}`,
    );

    commit('setLoadingCities', false);
    commit('setCities', data.cidades);

    return data.count;
  },
  resetCityForm({ commit }) {
    commit('resetCityForm');
  },
  async updateCity({ commit, state }, cityId) {
    commit('setLoadingCities', true);

    await axiosInstance.put(`${API_ROUTE}/${cityId}`, state.cityForm);

    commit('setLoadingCities', false);
  },
};

const getters = {
  getField,
  loadingCities: (state) => state.loadingCities,
  cityForm: (state) => state.cityForm,
  cities: (state) => state.cities,
};

const mutations = {
  resetCityForm(state) {
    state.cityForm = {
      _id: null,
      nome: '',
      estadoId: null,
    };
  },
  setLoadingCities(state, payload) {
    state.loadingCities = payload;
  },
  setCityForm(state, payload) {
    state.cityForm = {
      _id: payload._id,
      nome: payload.nome,
      estadoId: payload.estadoId,
    };
  },
  setCities(state, payload) {
    state.cities = payload;
  },
  updateField,
};

const state = {
  loadingCities: false,
  cityForm: {
    _id: null,
    nome: '',
    estadoId: null,
  },
  cities: [],
};

export default {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
};
