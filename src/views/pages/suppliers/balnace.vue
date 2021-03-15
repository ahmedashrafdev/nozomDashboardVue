<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="data-table-header">
          <h1>{{ $t("cashtray_report") }}</h1>
          <p class="desc">{{ $t("cashtray_desc") }}</p>
        </div>
        <v-card>
          <v-card-title>
          
          </v-card-title>
          <v-data-table
            :headers="datatable.headers"
            :items="datatable.data"
            :search="datatable.search"
            :loading="isLoading"
            
          >
            
          </v-data-table>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

// import { GET_CASHTRAY } from "@/store/cashtray.module";
export default {
  computed: {
    ...mapGetters("suppliers", [
      "isLoading", // -> this.someGetter
      "datatable", // -> this.someOtherGetter
    ]),
  },
  methods: {
    getSuppliersBalance() {
      this.$store.dispatch("suppliers/getSuppliersBalance", this.payload);
    },
  },

  created() {
    this.getSuppliersBalance();
  },
};
</script>
