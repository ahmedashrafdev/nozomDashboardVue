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
                    @input="getCashFlow"
                    append-outer-icon="event"
                    menu-props="auto"
                    hide-details
                    label="Select Year"
                    single-line
                  ></v-select>
                </v-col>
                <v-col cols="6">
                  <v-select
                    v-model="payload.AccSerial"
                    :cache-items="true"
                    @input="getCashFlow"
                    item-text="AccountName"
                    item-value="Serial"
                    :items="accounts"
                    :loading="accountsLoading"
                    append-outer-icon="apache-kafka"
                    menu-props="auto"
                    hide-details
                    label="Select Account"
                    single-line
                  ></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                   <v-menu
                      v-model="fromDateMenu"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      lazy
                      transition="scale-transition"
                      offset-y
                      full-width
                      max-width="290px"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          label="From Date"
                          prepend-icon="event"
                          readonly
                          :value="datePayload.DateFrom"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        locale="en-in"
                        :max="maxDate"
                        v-model="datePayload.DateFrom"
                        no-title
                        @input="getCashFlowDate"
                      ></v-date-picker>
                    </v-menu>
                </v-col>
                <v-col cols="6">
                  <v-menu
                      v-model="toDateMenu"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      lazy
                      transition="scale-transition"
                      offset-y
                      full-width
                      max-width="290px"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          label="From Date"
                          prepend-icon="event"
                          readonly
                          :value="datePayload.DateTo"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        locale="en-in"
                        :min="datePayload.DateFrom"
                        :max="maxDate"
                        v-model="datePayload.DateTo"
                        no-title
                        @input="getCashFlowDate"
                      ></v-date-picker>
                    </v-menu>
                </v-col>
              </v-row>
            </v-container>
          </v-card-title>
          <v-data-table
            :headers="flowDatatable.headers"
            :items="flowDatatable.data"
            :search="flowDatatable.search"
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
  data() {
    var max = new Date().getFullYear();
    var min = max - 10;
    var years = [];
    var maxDate = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDay()}`
    for (var i = max; i >= min; i--) {
      years.push(i);
    }
    return {
      years,
      fromDateMenu: false,
      toDateMenu: false,
      maxDate,
      AccSerial : null,
      datePayload:{
        DateFrom : null,
        DateTo : null,
      },
      payload: {
        year: `${new Date().getFullYear()}`,
      },
    };
  },
  computed: {
    ...mapGetters("cashtray", [
      "isLoading", // -> this.someGetter
      "flowDatatable", // -> this.someOtherGetter
    ]),
    ...mapGetters("reports", [
      "accounts", // -> this.someGetter
      "accountsLoading", // -> this.someOtherGetter
    ]),
  },
  methods: {
    getCashFlow() {
      this.datePayload.DateFrom = null
      this.datePayload.DateTo = null
      this.payload.AccSerial = this.AccSerial
      this.$store.dispatch("cashtray/getCashFlow", this.payload);
    },
    getCashFlowDate() {
      if(this.datePayload.DateFrom){
        this.datePayload.AccSerial = this.AccSerial
        this.datePayload.DateTo = this.datePayload.DateTo == null ? this.maxDate : this.datePayload.DateTo
        this.getCashFlowDate
        this.fromDateMenu = false
        this.toDateMenu = false
        this.$store.dispatch("cashtray/getCashFlowDate", this.datePayload);
      }
    },
    getAccounts() {
      const payload = {
        "Code" : 0,
        "Name":" ",
        "Type" : 5
      }
      this.$store.dispatch("reports/getAccounts" , payload)
      .then((d) => {
        // console.log(d[0].Serial)
        this.AccSerial = d[0].Serial;
        this.getCashFlow();
      });
    },
  },

  created() {
    this.getAccounts();
  },
};
</script>
