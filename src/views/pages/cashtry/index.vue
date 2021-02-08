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
            <v-container fluid>
              <v-row align="center">
                <v-col cols="6">
                  <v-select
                    v-model="payload.year"
                    model="payload.year"
                    :items="years"
                    @input="getCashTray"
                    append-outer-icon="event"
                    menu-props="auto"
                    hide-details
                    label="Select Year"
                    single-line
                  ></v-select>
                </v-col>
                <v-col cols="6">
                  <v-select
                    v-model="payload.store"
                    :cache-items="true"
                    @input="getCashTray"
                    item-text="store_name"
                    item-value="store_code"
                    :items="cashtrayStores"
                    append-outer-icon="apache-kafka"
                    menu-props="auto"
                    hide-details
                    label="Select Store"
                    single-line
                  ></v-select>
                </v-col>
              </v-row>
            </v-container>
          </v-card-title>
          <v-data-table
            :headers="datatable.headers"
            :items="datatable.cashtray"
            :search="datatable.search"
            :loading="isLoading"
            hide-default-footer
            disable-pagination
            dense
          ></v-data-table>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

// import { GET_CASHTRAY } from "@/store/cashtray.module";
export default {
  data() {
    var max = new Date().getFullYear();
    var min = max - 10;
    var years = [];

    for (var i = max; i >= min; i--) {
      years.push(i);
    }
    return {
      years,
      payload: {
        year: `${new Date().getFullYear()}`,
        store: 4,
      },
    };
  },
  computed: {
    ...mapGetters("cashtray", [
      "isLoading", // -> this.someGetter
      "datatable", // -> this.someOtherGetter
      "cashtrayStores", // -> this.someOtherGetter
    ]),
  },
  methods: {
    getCashTray() {
      this.$store.dispatch("cashtray/getCashTray", this.payload).catch(() => {
        this.$router.push({ name: "errpr" });
      });
    },
    getCashTrayStores() {
      this.$store.dispatch("cashtray/getCashTrayStores").catch(() => {
        this.$router.push({ name: "errpr" });
      });
    },
  },

  created() {
    this.getCashTray();
    this.getCashTrayStores();
  },
};
</script>
