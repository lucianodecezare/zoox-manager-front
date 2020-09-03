<template>
  <!-- Tabela -->
  <q-table
    binary-state-sort
    row-key="_id"
    virtual-scroll
    :columns="columns"
    :data="states"
    :filter="filter"
    :loading="loadingStates"
    :pagination.sync="pagination"
    @request="onRequest"
  >
    <!-- Headers -->
    <template v-slot:header="props">
      <q-tr :props="props">
        <q-th v-for="col in props.cols" :key="col.name" :props="props">
          {{ col.label }}
        </q-th>
      </q-tr>
    </template>
    <!-- Linhas -->
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td v-for="col in props.cols" :key="col.name" :props="props">
          <!-- Ações -->
          <template v-if="col.name === 'actions'">
            <!-- Botao Alterar -->
            <q-btn
              class="q-mr-xs"
              color="primary"
              glossy
              icon="edit"
              push
              round
              size="sm"
              :disable="loadingStates"
              @click.native="editState(props.row._id)"
            />
            <!-- Botao Remover -->
            <q-btn
              color="white"
              text-color="primary"
              glossy
              icon="delete"
              push
              round
              size="sm"
              :disable="loadingStates"
              @click.native="removeState(props.row._id)"
            />
          </template>
          <!-- Valores -->
          {{ col.value }}
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import ConfirmDelete from 'components/dialogs/ConfirmDelete';
import { notifications } from '../../utils/notifications';

export default {
  computed: {
    ...mapGetters('states', ['states', 'loadingStates']),
  },
  data() {
    return {
      columns: [
        // Nome
        {
          align: 'left',
          field: 'nome',
          label: this.$t('states.columnName'),
          name: 'nome',
          required: true,
          sortable: true,
        },
        // Abreviacao
        {
          align: 'left',
          field: 'abreviacao',
          label: this.$t('states.columnAbbreviation'),
          name: 'abreviacao',
          sortable: true,
        },
        // Ações
        {
          align: 'left',
          name: 'actions',
          label: this.$t('tables.columnActions'),
          sortable: false,
        },
      ],
      pagination: {
        descending: false,
        page: 1,
        rowsNumber: 10,
        rowsPerPage: 10,
        sortBy: 'nome',
      },
    };
  },
  methods: {
    ...mapActions('states', ['deleteState', 'getStates']),
    editState(stateId) {
      this.$emit('update-state', stateId);
    },
    async onRequest(props) {
      const {
        page, rowsPerPage, sortBy, descending,
      } = props.pagination;
      const { filter } = props;

      this.pagination.rowsNumber = await this.getStates({
        descending,
        page,
        sortBy,
        rowsPerPage,
        filter,
      });

      this.pagination.page = page;
      this.pagination.rowsPerPage = rowsPerPage;
      this.pagination.sortBy = sortBy;
      this.pagination.descending = descending;
    },
    async removeState(stateId) {
      this.$q.dialog({
        component: ConfirmDelete,
        parent: this,
      }).onOk(async () => {
        try {
          await this.deleteState(stateId);
          await this.onRequest({
            pagination: this.pagination,
            filter: undefined,
          });

          notifications.success(this.$t('states.messageSuccessDelete'));
        } catch (error) {
          notifications.error(this.$q, error);
        }
      });
    },
  },
  mounted() {
    this.onRequest({
      pagination: this.pagination,
      filter: undefined,
    });
  },
  props: ['filter'],
};
</script>
