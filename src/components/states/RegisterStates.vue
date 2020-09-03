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
          :disable="loadingStates"
          :label="$t('states.inputName')"
          :rules="[(val) => val && val.length > 0 || $t('forms.fieldRequired')]"
        />
        <!-- Abreviação -->
        <q-input
          class="col-xs-12 col-sm-4 col-md-2 col-lg-2"
          dense
          filled
          v-model="abreviacao"
          :disable="loadingStates"
          :label="$t('states.inputAbbreviation')"
          :rules="[
            (val) => val && val.length > 0 || $t('forms.fieldRequired'),
            (val) => val && val.length === 2 || $t('forms.fieldAbbreviation')
          ]"
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
          v-if="stateId === null"
          :disable="loadingStates"
          :label="$t('forms.buttonAdd')"
          :loading="loadingStates"
        />
        <template v-if="stateId !== null">
          <!-- Botao Alterar -->
          <q-btn
            class="col-xs-12 col-sm-3 col-md-2 col-lg-1 q-ma-xs"
            color="primary"
            glossy
            type="submit"
            v-if="stateId !== null"
            :disable="loadingStates"
            :label="$t('forms.buttonEdit')"
            :loading="loadingStates"
          />
          <!-- Botao Excluir -->
          <q-btn
            class="col-xs-12 col-sm-3 col-md-2 col-lg-1 q-ma-xs"
            color="white"
            glossy
            text-color="primary"
            v-if="stateId !== null"
            :disable="loadingStates"
            :label="$t('forms.buttonDelete')"
            :loading="loadingStates"
            @click="removeState"
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
    this.resetStateForm();

    if (this.stateId) {
      await this.getState(this.stateId);
    }
  },
  computed: {
    ...mapFields(
      'states',
      [
        'stateForm._id',
        'stateForm.nome',
        'stateForm.abreviacao',
      ],
    ),
    ...mapGetters('states', ['stateForm', 'loadingStates']),
  },
  methods: {
    ...mapActions(
      'states',
      [
        'createState',
        'deleteState',
        'getState',
        'resetStateForm',
        'updateState',
      ],
    ),
    async removeState() {
      this.$q.dialog({
        component: ConfirmDelete,
        parent: this,
      }).onOk(async () => {
        try {
          await this.deleteState(this.stateId);

          notifications.success(this.$t('states.messageSuccessDelete'));

          this.$emit('complete');
        } catch (error) {
          notifications.error(error);
        }
      });
    },
    async submitForm() {
      try {
        if (this.stateId) {
          await this.updateState(this.stateId);

          notifications.success(this.$t('states.messageSuccessUpdate'));
        } else {
          await this.createState();

          notifications.success(this.$t('states.messageSuccessInsert'));
        }

        this.$emit('complete');
      } catch (error) {
        notifications.error(error.message);
      }
    },
  },
  props: ['stateId'],
};
</script>
