<template>
  <q-btn push round size="md">
    <!-- Avatar -->
    <q-avatar size="40px">
      <img src="https://cdn.quasar.dev/img/avatar4.jpg">
    </q-avatar>
    <!-- Menu -->
    <q-menu>
      <!-- Opções -->
      <q-list style="min-width: 100px">
        <!-- Desconectar -->
        <q-item clickable v-close-popup @click="logoutUser">
          <q-item-section>{{ $t('menuUser.buttonLogout') }}</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script>
import { LocalStorage } from 'quasar';
import { mapActions } from 'vuex';

export default {
  name: 'UserMenu',
  beforeMount() {
    const username = LocalStorage.getItem('usuario');

    if (!username) {
      this.logoutUser();
    }
  },
  methods: {
    ...mapActions('session', ['logoutUser']),
  },
};
</script>
