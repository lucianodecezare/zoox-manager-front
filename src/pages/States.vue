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
              stateId
               ? $t('states.tableTitleEdit')
               : component === 'register' ? $t('states.tableTitleNew')
               : $t('states.tableTitleList')
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
            :disable="loadingStates"
            :label="$t('tables.buttonAdd')"
            :loading="loadingStates"
            @click="component = 'register'"
          />
          <!-- Botao Voltar -->
          <q-btn
            class="col-xs-12 col-sm-3 col-md-2 col-lg-1"
            color="white"
            glossy
            text-color="primary"
            v-if="component === 'register'"
            :disable="loadingStates"
            :label="$t('tables.buttonBack')"
            :loading="loadingStates"
            @click="cleanComponent"
          />
        </div>
      </q-card-section>
      <!-- Tabela -->
      <ListStates
        v-if="component === 'list'"
        :filter="filter"
        @update-state="updateState"
      />
      <!-- Registro -->
      <RegisterStates
        v-if="component === 'register'"
        :stateId="stateId"
        @complete="cleanComponent"
      />
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex';

import ListStates from 'components/states/ListStates';
import RegisterStates from 'components/states/RegisterStates';

export default {
  components: {
    ListStates,
    RegisterStates,
  },
  computed: {
    ...mapGetters('states', ['loadingStates']),
  },
  data() {
    return {
      component: 'list',
      stateId: null,
      filter: '',
    };
  },
  methods: {
    cleanComponent() {
      this.component = 'list';
      this.stateId = null;
      this.filter = '';
    },
    updateState(id) {
      this.stateId = id;
      this.component = 'register';
    },
  },
};
</script>
