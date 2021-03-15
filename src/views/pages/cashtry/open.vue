<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="data-table-header">
          <h1>{{ $t("open_cashtray_report") }}</h1>
          <p class="desc">{{ $t("open_cashtray_desc") }}</p>
        </div>
        <v-card>
          <v-card-title>
            <v-text-field
              v-model="OpenCashtryDatatable.search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
         
              <v-data-table
                :headers="OpenCashtryDatatable.headers"
                :items="OpenCashtryDatatable.data"
                :search="OpenCashtryDatatable.search"
                :loading="isLoading"
              >
              <template slot="body.append">
                <tr class="text-center sm-hidden black--text">
                  <th class="text-center">Totals</th>
                  <th class="text-center"></th>
                  <th class="text-center"></th>
                  <th class="text-center">{{ OpenCashtryDatatable.totalCashSum }} EGP</th>
                  <th class="text-center">{{ OpenCashtryDatatable.totalVisaSum }} EGP</th>
                </tr>
              </template>
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
    ...mapGetters("cashtray", [
      "isLoading", // -> this.someGetter
      "OpenCashtryDatatable", // -> this.someOtherGetter
    ]),
  },
  methods: {
    getOpenCashTray() {
      this.$store.dispatch("cashtray/getOpenCashTray");
    },
  },

  created() {
    this.getOpenCashTray();
  },
};
</script>
