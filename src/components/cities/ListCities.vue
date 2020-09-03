<template>
  <!-- Tabela -->
  <q-table
    binary-state-sort
    row-key="_id"
    virtual-scroll
    :columns="columns"
    :data="cities"
    :filter="filter"
    :loading="loadingCities"
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
              :disable="loadingCities"
              @click.native="editCity(props.row._id)"
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
              :disable="loadingCities"
              @click.native="removeCity(props.row._id)"
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
    ...mapGetters('cities', ['cities', 'loadingCities']),
  },
  data() {
    return {
      columns: [
        // Nome
        {
          align: 'left',
          field: 'nome',
          label: this.$t('cities.columnName'),
          name: 'nome',
          required: true,
          sortable: true,
        },
        // Estado
        {
          align: 'left',
          field: 'estadoId',
          format: (val) => val.abreviacao,
          label: this.$t('cities.columnStateId'),
          name: 'estadoId',
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
    ...mapActions('cities', ['deleteCity', 'getCities']),
    editCity(cityId) {
      this.$emit('update-city', cityId);
    },
    async onRequest(props) {
      const {
        page, rowsPerPage, sortBy, descending,
      } = props.pagination;
      const { filter } = props;

      this.pagination.rowsNumber = await this.getCities({
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
    async removeCity(cityId) {
      this.$q.dialog({
        component: ConfirmDelete,
        parent: this,
      }).onOk(async () => {
        try {
          await this.deleteCity(cityId);
          await this.onRequest({
            pagination: this.pagination,
            filter: undefined,
          });

          notifications.success(this.$t('cities.messageSuccessDelete'));
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
