<template>
  <div class="kt-widget20">
    <div class="kt-widget20__content kt-portlet__space-x chart-flex">
      <span class="kt-widget20__number kt-font-brand">{{ sum }}</span>
    </div>
    <div class="kt-widget20__chart" style="height: 130px">
      <Chart1
        ref="chart"
        v-bind:options="chartOptions"
        v-if="!loading"
      ></Chart1>
      <v-progress-circular v-else />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Chart from "chart.js";
import Chart1 from "@/views/partials/widgets/Chart1.vue";

export default {
  name: "widget-20",
  components: {
    Chart1,
  },
  data() {
    var max = new Date().getFullYear();
    var min = max - 10;
    var years = [];

    for (var i = max; i >= min; i--) {
      years.push(i);
    }
    return {
      chartOptions: {},
      years,
      loading: true,
      sum: null,
      payload: {
        Year: `${new Date().getFullYear()}`,
      },
    };
  },
  mounted() {
    this.getMonthlySales();
  },
  computed: {
    ...mapGetters(["layoutConfig"]),
    ...mapGetters("reports", ["isMonthLoading"]),
  },
  methods: {
    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    getMonthlySales() {
      this.$store
        .dispatch("reports/getMonthlySales", this.payload)
        .then((d) => {
          // const ctx = this.$refs["chart"].$el.getContext("2d");
          // var gradient = ctx.createLinearGradient(0, 0, 0, 240);
          // gradient.addColorStop(
          //   0,
          //   Chart.helpers.color("#d1f1ec").alpha(1).rgbString()
          // );
          // gradient.addColorStop(
          //   1,
          //   Chart.helpers.color("#d1f1ec").alpha(0.3).rgbString()
          // );
          this.sum = `${this.numberWithCommas(
            parseFloat(d.sum).toFixed(2)
          )} EGP`;
          const defaults = {
            data: {
              labels: d.labels,
              datasets: [
                {
                  label: this.$t("TotalAmount"),
                  backgroundColor: "#4682b4",
                  borderColor: this.layoutConfig("colors.state.success"),
                  pointBackgroundColor: Chart.helpers
                    .color("#000000")
                    .alpha(0)
                    .rgbString(),
                  pointBorderColor: Chart.helpers
                    .color("#000000")
                    .alpha(0)
                    .rgbString(),
                  pointHoverBackgroundColor: this.layoutConfig(
                    "colors.state.danger"
                  ),
                  pointHoverBorderColor: Chart.helpers
                    .color("#000000")
                    .alpha(0.1)
                    .rgbString(),
                  data: d.datasets,
                },
              ],
            },
          };

          this.chartOptions = Object.assign({}, defaults, this.chartOptions);
          this.loading = false;
        });
    },
  },
};
</script>
