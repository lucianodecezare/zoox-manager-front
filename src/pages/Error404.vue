<template>
  <div class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 30vh">
        404
      </div>

      <div class="text-h2" style="opacity:.4">
        {{ $t('404.message') }}
      </div>

      <q-btn
        class="q-mt-xl"
        color="white"
        no-caps
        text-color="blue"
        to="/"
        size="xl"
        unelevated
        :label="$t('404.buttonBack')"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error404',
};
</script>
