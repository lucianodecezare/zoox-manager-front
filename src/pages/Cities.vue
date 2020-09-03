<template>
  <q-page padding :class="{ 'bg-blue-1': !$q.dark.isActive }">
    <div class="q-pa-md">
      <q-card flat bordered class="my-card q-pa-xs">
      <!-- Top -->
      <q-card-section>
        <div class="row">
          <!-- Titulo -->
          <div
            class="col-xs-12 text-h6 text-weight-bold"
            :class="{
              'col-sm-5': component === 'list',
              'col-md-7': component === 'list',
              'col-lg-9': component === 'list',
              'col-sm-9': component === 'register',
              'col-md-10': component === 'register',
              'col-lg-11': component === 'register',
            }">
            {{
              cityId
               ? $t('cities.tableTitleEdit')
               : component === 'register' ? $t('cities.tableTitleNew')
               : $t('cities.tableTitleList')
            }}
          </div>
          <!-- Input Pesquisar -->
          <q-input
            class="col-xs-12 col-sm-4 col-md-3 col-lg-2 q-pr-sm"
            color="primary"
            debounce="100"
            dense
            filled
            v-if="component === 'list'"
            v-model="filter"
            :placeholder="$t('tables.inputSearch')"
          >
            <!-- Icone -->
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
          <!-- Botao Adicionar -->
          <q-btn
            class="col-xs-12 col-sm-3 col-md-2 col-lg-1"
            color="primary"
            glossy
            v-if="component === 'list'"
            :disable="loadingCities"
            :label="$t('tables.buttonAdd')"
            :loading="loadingCities"
            @click="component = 'register'"
          />
          <!-- Botao Voltar -->
          <q-btn
            class="col-xs-12 col-sm-3 col-md-2 col-lg-1"
            color="white"
            glossy
            text-color="primary"
            v-if="component === 'register'"
            :disable="loadingCities"
            :label="$t('tables.buttonBack')"
            :loading="loadingCities"
            @click="cleanComponent"
          />
        </div>
      </q-card-section>
      <!-- Tabela -->
      <ListCities
        v-if="component === 'list'"
        :filter="filter"
        @update-city="updateCity"
      />
      <!-- Registro -->
      <RegisterCities
        v-if="component === 'register'"
        :cityId="cityId"
        @complete="cleanComponent"
      />
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex';

import ListCities from 'components/cities/ListCities';
import RegisterCities from 'components/cities/RegisterCities';

export default {
  components: {
    ListCities,
    RegisterCities,
  },
  computed: {
    ...mapGetters('cities', ['loadingCities']),
  },
  data() {
    return {
      component: 'list',
      cityId: null,
      filter: '',
    };
  },
  methods: {
    cleanComponent() {
      this.component = 'list';
      this.cityId = null;
      this.filter = '';
    },
    updateCity(id) {
      this.cityId = id;
      this.component = 'register';
    },
  },
};
</script>
