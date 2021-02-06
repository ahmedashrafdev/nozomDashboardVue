<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <v-card>
          <v-card-title>
            {{ $t("cashtray") }}
            <v-spacer></v-spacer>
            <v-text-field
              v-model="datatable.search"
              append-icon="search"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
            <v-container fluid>
              <v-row align="center">
                <v-col cols="3">
                  <v-select
                    v-model="payload.year"
                    :items="years"
                    @input="getCashTray"
                    append-outer-icon="event"
                    menu-props="auto"
                    hide-details
                    label="Select Year"
                    single-line
                  ></v-select>
                </v-col>
                <v-col cols="3">
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
    return {
      years: ["2016", "2017", "2018", "2019", "2020", "2021"],
      payload: {
        year: "2020",
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
      this.$store.dispatch("cashtray/getCashTray", this.payload);
    },
    getCashTrayStores() {
      this.$store.dispatch("cashtray/getCashTrayStores");
    },
  },

  created() {
    this.getCashTray();
    this.getCashTrayStores();
  },
};
</script>
