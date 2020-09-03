<template>
  <q-dialog persistent ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-card-section class="row items-center">
        <!-- Icone -->
        <q-avatar icon="warning" text-color="primary" />
        <!-- Mensagem -->
        <span class="q-ml-sm">{{ $t('dialogs.messageConfirmDelete') }}</span>
      </q-card-section>
      <q-card-actions align="right">
        <!-- Botao OK -->
        <q-btn color="primary" glossy :label="$t('dialogs.buttonOk')" @click="onOKClick" />
        <!-- Botao Cancelar -->
        <q-btn
          text-color="primary"
          glossy
          :label="$t('dialogs.buttonCancel')"
          @click="onCancelClick"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  props: {},
  methods: {
    // following method is REQUIRED
    // (don't change its name --> "show")
    show() {
      this.$refs.dialog.show();
    },
    // following method is REQUIRED
    // (don't change its name --> "hide")
    hide() {
      this.$refs.dialog.hide();
    },
    onDialogHide() {
      // required to be emitted
      // when QDialog emits "hide" event
      this.$emit('hide');
    },
    onOKClick() {
      // on OK, it is REQUIRED to
      // emit "ok" event (with optional payload)
      // before hiding the QDialog
      this.$emit('ok');
      // or with payload: this.$emit('ok', { ... })
      // then hiding dialog
      this.hide();
    },
    onCancelClick() {
      // we just need to hide dialog
      this.hide();
    },
  },
};
</script>
