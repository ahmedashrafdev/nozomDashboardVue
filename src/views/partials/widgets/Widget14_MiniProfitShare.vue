<template>
  <div class="kt-widget14">
    <div class="kt-widget14__header">
      <h3 class="kt-widget14__title">{{ $t("branch_profit") }}</h3>
      <span class="kt-widget14__desc">
        {{ $t("branch_profit_share") }}
      </span>
    </div>
    <div class="kt-widget14__content">
      <div class="kt-widget14__chart">
        <div class="kt-widget14__stat font-sm">{{ topBranchesProfitSum }}</div>
        <Chart1
          ref="chart"
          v-if="!isProfitLoading"
          v-bind:options="topBranchesProfitChartOptions"
          height="150"
          width="150"
        ></Chart1>
        <v-progress-circular v-else />
      </div>
      <div class="kt-widget14__legends">
        <div
          class="kt-widget14__legend"
          v-for="(branch, index) in topBranchesProfit"
          :key="index"
        >
          <span
            class="kt-widget14__bullet"
            :style="`background-color:${branch.Color}`"
          ></span>
          <span class="kt-widget14__stats"
            >{{ branch.Percent }}% {{ branch.StoreName }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Chart1 from "@/views/partials/widgets/Chart1.vue";

export default {
  name: "widget-14-2",
  components: {
    Chart1,
  },
  data() {
    let date = new Date();
    date = `${date.getFullYear()}-${date.getMonth() + 1}`;
    return {
      dateMenu: false,
      dateVal: null,
      maxDate: date,
      date,
      payload: {
        year: `${new Date().getFullYear}`,
        month: `${new Date().getMonth() + 1}`,
      },
    };
  },
  props: {
    title: String,
    desc: String,
  },
  created() {
    this.getTopBranchesProfit();
  },
  methods: {
    getTopBranchesProfit() {
      this.extractDate(this.date);
      this.$store.dispatch("reports/getTopBranchesProfit", this.payload);
    },
    extractDate(d) {
      var res = d.split("-");
      this.payload.year = res[0];
      this.payload.month = res[1];
    },
  },
  computed: {
    ...mapGetters(["layoutConfig"]),
    ...mapGetters("reports", [
      "topBranchesProfit", // -> this.someOtherGetter
      "isProfitLoading",
      "topBranchesProfitChartOptions",
      "topBranchesProfitSum", // -> this.someOtherGetter
    ]),
  },
};
</script>
