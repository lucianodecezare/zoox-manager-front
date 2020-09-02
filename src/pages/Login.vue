<template>
  <q-page
    class="bg-primary flex flex-center"
  >
    <!-- :class="{ 'bg-red-1': !$q.dark.isActive, 'bg-grey-10': $q.dark.isActive }" -->
    <q-card flat bordered class="my-card q-pa-md full-width" style="max-width: 350px">
      <!-- Titulo -->
      <q-card-section>
        <div class="text-h4 text-center text-weight-bold">{{ $t('login.title') }}</div>
      </q-card-section>
      <!-- Form -->
      <q-form @submit="onSubmit" class="q-gutter-md">
        <!-- Input Usuario -->
        <q-input
          dense
          filled
          lazy-rules
          v-model="formData.usuario"
          :label="$t('login.inputUsername')"
          :rules="[val => val && val.length > 0 || $t('forms.fieldRequired')]"
        />
        <!-- Input Senha -->
        <q-input
          dense
          filled
          lazy-rules
          type="password"
          v-model="formData.senha"
          :label="$t('login.inputPassword')"
          :rules="[val => val && val.length > 0 || $t('forms.fieldRequired')]"
        />
        <!-- Botao Enviar -->
        <div>
          <q-btn
            class="full-width"
            color="primary"
            glossy
            type="submit"
            :label="$t('login.buttonLogin')"
          />
        </div>
      </q-form>
    </q-card>
  </q-page>
</template>

<script>
import { mapActions } from 'vuex';
import { notifications } from '../utils/notifications';

export default {
  data() {
    return {
      formData: {
        usuario: '',
        senha: '',
      },
    };
  },
  methods: {
    ...mapActions('session', ['loginUser']),
    onSubmit() {
      this.$q.loading.show({ message: this.$t('login.messageAuth') });

      this.loginUser(this.formData).catch((error) => {
        notifications.error(error.message);
      });

      this.$q.loading.hide();
    },
  },
};
</script>
