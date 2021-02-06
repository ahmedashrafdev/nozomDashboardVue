<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <v-card>
          <v-card-title>
            {{ $t("top_sales") }}
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
                          :value="dateVal"
                          @input="getTopItems"
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
                    v-model="payload.store"
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
      stores: [
        {store_name: this.$t('all'),store_code:0}
      ],
      dateMenu: false,
      dateVal:null,
      maxDate: "2021-2",
      date:"2020-01",
      payload: {
        year: "2020",
        store: 4,
        month: 1,
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
      this.extractDate(this.date)
      this.$store.dispatch("reports/getTopItems", this.payload);
    },
    extractDate(d){
      var res = d.split("-");
      this.payload.year = res[0]
      this.payload.month = res[1]
    },
    getCashTrayStores() {
      this.$store.dispatch("cashtray/getCashTrayStores")
      .then(d => {
        this.stores = this.stores.concat(d)
      })
    },
  },

  created() {
    this.getTopItems();
    this.getCashTrayStores();
  },
};
</script>
