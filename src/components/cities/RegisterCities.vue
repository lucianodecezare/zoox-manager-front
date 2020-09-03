<template>
  <div class="q-pa-md">
    <!-- Form -->
    <q-form ref="form" @submit="submitForm">
      <div class="q-col-gutter-md row">
        <!-- Nome -->
        <q-input
          class="col-xs-12 col-sm-4 col-md-2 col-lg-2"
          dense
          filled
          v-model="nome"
          :disable="loadingCities"
          :label="$t('cities.inputName')"
          :rules="[(val) => val && val.length > 0 || $t('forms.fieldRequired')]"
        />
        <!-- Abreviação -->
         <q-select
          class="col-xs-12 col-sm-4 col-md-2 col-lg-2"
          dense
          emit-value
          filled
          map-options
          option-label="nome"
          option-value="_id"
          v-model="estadoId"
          :disable="loadingStates || loadingCities"
          :label="$t('cities.comboStateId')"
          :options="states"
          :rules="[(val) => val === val]"
        />
      </div>

      <!-- Controles -->
      <div class="justify-center q-pt-md row">
        <!-- Botao Adicionar -->
        <q-btn
          class="col-xs-12 col-sm-3 col-md-2 col-lg-1 q-ma-xs"
          color="primary"
          glossy
          type="submit"
          v-if="cityId === null"
          :disable="loadingCities"
          :label="$t('forms.buttonAdd')"
          :loading="loadingCities"
        />
        <template v-if="cityId !== null">
          <!-- Botao Alterar -->
          <q-btn
            class="col-xs-12 col-sm-3 col-md-2 col-lg-1 q-ma-xs"
            color="primary"
            glossy
            type="submit"
            v-if="cityId !== null"
            :disable="loadingCities"
            :label="$t('forms.buttonEdit')"
            :loading="loadingCities"
          />
          <!-- Botao Excluir -->
          <q-btn
            class="col-xs-12 col-sm-3 col-md-2 col-lg-1 q-ma-xs"
            color="white"
            glossy
            text-color="primary"
            v-if="cityId !== null"
            :disable="loadingCities"
            :label="$t('forms.buttonDelete')"
            :loading="loadingCities"
            @click="removeCity"
          />
        </template>
      </div>
    </q-form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { mapFields } from 'vuex-map-fields';

import ConfirmDelete from 'components/dialogs/ConfirmDelete';
import { notifications } from '../../utils/notifications';

export default {
  async mounted() {
    this.resetCityForm();
    this.getStates({
      descending: false,
      page: 1,
      sortBy: 'nome',
      rowsPerPage: 0,
      filter: undefined,
    });

    if (this.cityId) {
      await this.getCity(this.cityId);
    }
  },
  computed: {
    ...mapFields(
      'cities',
      [
        'cityForm._id',
        'cityForm.nome',
        'cityForm.estadoId',
      ],
    ),
    ...mapGetters('cities', ['cityForm', 'loadingCities']),
    ...mapGetters('states', ['states', 'loadingStates']),
  },
  methods: {
    ...mapActions(
      'cities',
      [
        'createCity',
        'deleteCity',
        'getCity',
        'resetCityForm',
        'updateCity',
      ],
    ),
    ...mapActions('states', ['getStates']),
    async removeCity() {
      this.$q.dialog({
        component: ConfirmDelete,
        parent: this,
      }).onOk(async () => {
        try {
          await this.deleteCity(this.cityId);

          notifications.success(this.$t('cities.messageSuccessDelete'));

          this.$emit('complete');
        } catch (error) {
          notifications.error(error);
        }
      });
    },
    async submitForm() {
      try {
        if (this.cityId) {
          await this.updateCity(this.cityId);

          notifications.success(this.$t('cities.messageSuccessUpdate'));
        } else {
          await this.createCity();

          notifications.success(this.$t('cities.messageSuccessInsert'));
        }

        this.$emit('complete');
      } catch (error) {
        notifications.error(error.message);
      }
    },
  },
  props: ['cityId'],
};
</script>
