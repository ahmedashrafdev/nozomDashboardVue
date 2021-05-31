<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="data-table-header">
          <h1>{{ $t("suppliers_report") }}</h1>
          <p class="desc">{{ $t("suppliers_desc") }}</p>
        </div>
        <v-card>
          <v-card-title>
          
          </v-card-title>
          <v-data-table
            :headers="datatable.headers"
            :items="datatable.data"
            :search="datatable.search"
            :loading="isLoading"
            fixed-header
            height="600px"
          >
            <template slot="body.append">
              <tr class="text-center sm-hidden black--text">
                <th class="text-center">{{ $t("totals") }}</th>
                <th class="text-center"></th>
                <th class="text-center">{{numberWithCommas(parseFloat(datatable.totals.DBT).toFixed(2))}} EGP</th>
                <th class="text-center">{{numberWithCommas(parseFloat(datatable.totals.CRDT).toFixed(2))}} EGP</th>
                <th class="text-center">{{numberWithCommas(parseFloat(datatable.totals.Buy).toFixed(2))}} EGP</th>
                <th class="text-center">{{numberWithCommas(parseFloat(datatable.totals.ReturnBuy).toFixed(2))}} EGP</th>
                <th class="text-center">{{numberWithCommas(parseFloat(datatable.totals.Discount).toFixed(2))}} EGP</th>
                <th class="text-center">{{numberWithCommas(parseFloat(datatable.totals.NetBuy).toFixed(2))}} EGP</th>
                <th class="text-center">{{numberWithCommas(parseFloat(datatable.totals.Paid).toFixed(2))}} EGP</th>
                <th class="text-center">{{numberWithCommas(parseFloat(datatable.totals.CHEQUE).toFixed(2))}} EGP</th>
                <th class="text-center">{{numberWithCommas(parseFloat(datatable.totals.CHQUnderCollec).toFixed(2))}} EGP</th>
                <th class="text-center">{{numberWithCommas(parseFloat(datatable.totals.BalanceDebit).toFixed(2))}} EGP</th>
                <th class="text-center">{{numberWithCommas(parseFloat(datatable.totals.BalanceCredit).toFixed(2))}} EGP</th>
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
    ...mapGetters("suppliers", [
      "isLoading", // -> this.someGetter
      "datatable", // -> this.someOtherGetter
    ]),
  },
  methods: {
    getSuppliersBalance() {
      this.$store.dispatch("suppliers/getSuppliersBalance", this.payload);
    },
    numberWithCommas (x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  },

  created() {
    this.getSuppliersBalance();
  },
};
</script>
