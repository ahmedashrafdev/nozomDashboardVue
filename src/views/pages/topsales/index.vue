<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="data-table-header">
          <h1>{{ $t("topsales_report") }}</h1>
          <p class="desc">{{ $t("topsales_desc") }}</p>
        </div>
        <v-card>
          <v-card-title>
            <v-container fluid>
              <v-row align="center">
                <v-col cols="4">
                  <v-menu
                    v-model="dateMenu"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        label="Select Date"
                        prepend-icon="event"
                        readonly
                        :value="date"
                        @input="getTopItems"
                        hide-details
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      locale="en-in"
                      type="month"
                      v-model="date"
                      no-title
                      @input="getTopItems"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <!-- <v-col cols="4">
                  <v-select
                    v-model="payload.year"
                    :items="years"
                    @input="getTopItems"
                    append-outer-icon="event"
                    menu-props="auto"
                    hide-details
                    label="Select Year"
                    single-line
                  ></v-select>
                </v-col>
                <v-col cols="4">
                  <v-select
                    v-model="payload.month"
                    :items="monthes"
                    @input="getTopItems"
                    append-outer-icon="event"
                    menu-props="auto"
                    hide-details
                    label="Select Month"
                    single-line
                  ></v-select>
                </v-col> -->
                <v-col cols="4">
                  <v-select
                    v-model="payload.Store"
                    :cache-items="true"
                    @input="getTopItems"
                    item-text="store_name"
                    item-value="store_code"
                    :items="stores"
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
            :items="datatable.data"
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
    let date = new Date();
    date = `${date.getFullYear()}-${date.getMonth() + 1}`;
    return {
      date,
      stores: [{ store_name: this.$t("all"), store_code: 0 }],
      dateMenu: false,
      payload: {
        Year: null,
        Store: 0,
        Month: null,
      },
    };
  },
  computed: {
    fromDateDisp() {
      return this.fromDateVal;
      // format/do something with date
    },
    ...mapGetters("reports", [
      "datatable", // -> this.someOtherGetter
      "isLoading", // -> this.someOtherGetter
    ]),
  },
  methods: {
    getTopItems() {
      this.extractDate(this.date);
      this.$store.dispatch("reports/getTopItems", this.payload).catch(() => {
        this.$router.push({ name: "error" });
      });
    },
    extractDate(d) {
      var res = d.split("-");
      this.payload.Year = res[0];
      this.payload.Month = res[1];
    },
    getCashTrayStores() {
      this.$store
        .dispatch("cashtray/getCashTrayStores")
        .then((d) => {
          this.stores = this.stores.concat(d);
        })
        .catch(() => {
          this.$router.push({ name: "error" });
        });
    },
  },

  created() {
    this.getTopItems();
    this.getCashTrayStores();
  },
};
</script>
