<template>
  <q-btn class="q-mr-xs" push round size="sm">
    <!-- Icone -->
    <q-avatar size="md">
      <img :src="`flags/${selectedLocale.icon}.png`">
    </q-avatar>
    <!-- Menu -->
    <q-menu>
      <!-- Opcoes -->
      <q-list v-for="language in languages" :key="language.locale" style="min-width: 140px">
        <q-item clickable v-close-popup v-ripple @click="changeLocale(language)">
          <q-item-section>
            <q-avatar size="md">
              <img :src="`flags/${language.icon}.png`">
            </q-avatar>
          </q-item-section>
          <q-item-section class="q-pr-md">{{ language.name }}</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script>
import { LocalStorage } from 'quasar';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'LanguageSelector',
  beforeMount() {
    const storageLocale = LocalStorage.getItem('locale') || 'pt-br';
    const [newLocale] = this.languages.filter((locale) => locale.locale === storageLocale);

    this.changeLocale(newLocale);
  },
  computed: {
    ...mapGetters('settings', ['languages', 'selectedLocale']),
  },
  methods: {
    ...mapActions('settings', ['changeSelectedLocale']),
    changeLocale(locale) {
      this.$q.loading.show({ message: this.$t('locale.messageChangingLocale') });

      this.$i18n.locale = locale.locale;

      this.changeSelectedLocale(locale);

      this.$q.loading.hide();
    },
  },
};
</script>
