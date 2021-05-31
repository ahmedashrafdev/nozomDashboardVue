<template>
  <div class="kt-widget14">
    <div class="kt-widget14__header kt-margin-b-30">
      <h3 class="kt-widget14__title">{{$t('daily_sales')}}</h3>
      <span class="kt-widget14__desc">
        {{ sum }}
      </span>
    </div>
    <div class="kt-widget14__chart">
      <Chart1
        v-if="!loading"
        ref="chart"
        v-bind:options="chartOptions"
      ></Chart1>
      <v-progress-linear v-else />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Chart1 from "@/views/partials/widgets/Chart1.vue";

export default {
  name: "widget-14-1",
  components: {
    Chart1,
  },
  data() {
    return {
      sum: null,
      loading: true,
      payload: {
        Year: `${new Date().getFullYear()}`,
        Month: `${new Date().getMonth() + 1}`,
      },
      chartOptions: {},
    };
  },
  props: {
    title: String,
    desc: String,
  },
  mounted() {
    this.getDailySales();
  },
  created() {},
  methods: {
    getDailySales() {
      this.$store.dispatch("reports/getDailySales", this.payload).then((d) => {
        this.sum = d.sum;
        const chartData = {
          labels: d.labels,
          datasets: [
            {
              //label: 'Dataset 1',
              backgroundColor: this.layoutConfig("colors.state.success"),
              data: d.datasets,
            },
            {
              //label: 'Dataset 2',
              backgroundColor: "#f3f3fb",
              data: d.datasets,
            },
          ],
        };
        this.chartOptions = {
          type: "bar",
          data: chartData,
          options: {
            title: {
              display: false,
            },
            tooltips: {
              intersect: false,
              mode: "nearest",
              xPadding: 10,
              yPadding: 10,
              caretPadding: 10,
            },
            legend: {
              display: false,
            },
            responsive: true,
            maintainAspectRatio: false,
            barRadius: 4,
            scales: {
              xAxes: [
                {
                  display: false,
                  gridLines: false,
                  stacked: true,
                },
              ],
              yAxes: [
                {
                  display: false,
                  stacked: true,
                  gridLines: false,
                },
              ],
            },
            layout: {
              padding: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
              },
            },
          },
        };
        this.loading = false;
      });
    },
  },
  computed: {
    ...mapGetters(["layoutConfig"]),
    ...mapGetters("reports", ["isDailyLoading"]),
  },
};
</script>
