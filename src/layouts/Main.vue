<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title class="flex justify-center">
          <!-- Botao Home -->
          <q-btn
            flat
            size="lg"
            stretch
            style="margin-left: -12px"
            to="/"
            :label="$t('menuMain.buttonHome')"
          />
        </q-toolbar-title>

        <LanguageSelector />

        <UserMenu />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          Menu
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue';
import LanguageSelector from 'components/LanguageSelector';
import UserMenu from 'components/UserMenu.vue';

const linksData = [
  {
    title: 'Cidades',
    icon: 'house',
    link: '/cidades',
  },
  {
    title: 'Estados',
    icon: 'location_city',
    link: '/estados',
  },
];

export default {
  name: 'MainLayout',
  components: { EssentialLink, LanguageSelector, UserMenu },
  data() {
    return {
      leftDrawerOpen: true,
      essentialLinks: linksData,
    };
  },
};
</script>
