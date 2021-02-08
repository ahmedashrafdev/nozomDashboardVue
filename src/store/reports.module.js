// import axios from "axios";
import ApiService from "@/common/api.service";
import i18n from "@/common/plugins/vue-i18n.js";
const state = {
  errors: null,

  datatable: {
    search: "",
    headers: [
      { align: "center", text: i18n.t("ItemName"), value: "ItemName" },
      { align: "center", text: i18n.t("TotalAmount"), value: "TotalAmount" },
      { align: "center", text: i18n.t("TotalQnt"), value: "TotalQnt" },
      { align: "center", text: i18n.t("Profit"), value: "Profit" },
      { align: "center", text: i18n.t("Disc"), value: "Disc" },
    ],
    data: [],
  },
  colors: [
    "#34bfa3",
    "#36a3f7",
    "#ffb822",
    "#fd3995",
    "#f0f3ff",
    "#d9dffa",
    "#afb4d4",
    "#646c9a",
    "#c5cbe3",
    "#a1a8c3",
    "#3d4465",
    "#3e4466",
  ],
  topBranchesSum: 0,
  topBranchesChartOptions: {
    type: "doughnut",
    data: {
      datasets: [
        {
          data: [],
          backgroundColor: [],
        },
      ],
      labels: [],
    },
    options: {
      cutoutPercentage: 75,
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: false,
        position: "top",
      },
      title: {
        display: false,
        text: "Technology",
      },
      animation: {
        animateScale: true,
        animateRotate: true,
      },
      tooltips: {
        enabled: true,
        intersect: false,
        mode: "nearest",
        bodySpacing: 5,
        yPadding: 10,
        xPadding: 10,
        caretPadding: 0,
        displayColors: false,
        backgroundColor: "#5d78ff",
        titleFontColor: "#ffffff",
        cornerRadius: 4,
        footerSpacing: 0,
        titleSpacing: 0,
      },
    },
  },
  isMonthLoading: false,
  monthlySalesSum: 0,
  monthlySalesDatasets: [],
  monthlySalesLables: [],
  topBranches: [],
  isLoading: false,
};

const getters = {
  datatable(state) {
    return state.datatable;
  },
  isLoading(state) {
    return state.isLoading;
  },
  isMonthLoading(state) {
    return state.isLoading;
  },
  topBranches(state) {
    return state.topBranches;
  },
  topBranchesChartOptions(state) {
    return state.topBranchesChartOptions;
  },
  topBranchesSum(state) {
    return state.topBranchesSum;
  },
  monthlySales(state) {
    return state.monthlySales;
  },
  monthlySalesSum(state) {
    return state.monthlySalesSum;
  },
};

const actions = {
  getTopItems(ctx, payload) {
    ctx.commit("setLoading", true);
    // commit(mutations.setLoading, true);
    return new Promise((resolve, reject) => {
      ApiService.query("top", payload)
        .then((res) => {
          ctx.commit("setItems", []);
          const data = res.data.map((item) => {
            return {
              ItemName: item.ItemName,
              TotalAmount: `${parseFloat(item.TotalAmount).toFixed(2)} EGP`,
              TotalQnt: parseInt(item.TotalQnt),
              Profit: `${parseFloat(item.Profit).toFixed(2)} EGP`,
              Disc: `${parseFloat(item.Disc).toFixed(2)} EGP`,
            };
          });
          ctx.commit("setItems", data);
          ctx.commit("setLoading", false);

          resolve(data);
        })
        .catch((res) => {
          ctx.commit("setLoading", false);
          reject(res);
        });
    });
  },
  getTopBranches(ctx, payload) {
    ctx.commit("setLoading", true);
    // commit(mutations.setLoading, true);
    return new Promise((resolve, reject) => {
      ApiService.query("branches-sales", payload)
        .then((res) => {
          let sum = 0;
          let datasets = [];
          let colors = [];
          let labels = [];
          res.data.forEach((item, index) => {
            datasets.push(parseFloat(item.Totalamount).toFixed(2));
            colors.push(ctx.state.colors[index]);
            labels.push(item.StoreName);
            sum = sum + parseFloat(item.Totalamount);
          });
          const data = res.data.map((item, index) => {
            return {
              StoreName: item.StoreName,
              TotalAmount: parseFloat(item.Totalamount).toFixed(2),
              Color: ctx.state.colors[index],
              Percent: parseFloat(
                (parseFloat(item.Totalamount) / sum) * 100
              ).toFixed(2),
            };
          });
          ctx.commit("setLoading", false);
          ctx.commit("setTopBranches", data);
          ctx.commit("setTopBranchesDataSets", datasets);
          ctx.commit("setTopBranchesColors", colors);
          ctx.commit("setTopBranchesLabels", labels);
          ctx.commit("setTopBranchesSum", parseFloat(sum).toFixed(2));
          resolve(res.data);
        })
        .catch((res) => {
          ctx.commit("setLoading", false);
          reject(res);
        });
    });
  },
  getMonthlySales(ctx, payload) {
    ctx.commit("setMonthLoading", true);
    // commit(mutations.setLoading, true);
    return new Promise((resolve, reject) => {
      ApiService.query("monthly-sales", payload)
        .then((res) => {
          let sum = 0;
          let datasets = [];
          let labels = [];
          res.data.forEach((item) => {
            datasets.push(parseFloat(item.Totalamount).toFixed(2));
            labels.push(i18n.t(`mo${item.DocMonth}`));
            sum = sum + parseFloat(item.Totalamount);
          });
          ctx.commit("setMonthLoading", false);
          ctx.commit("setMonthlySalesSum", parseFloat(sum).toFixed(2));
          resolve({ datasets, labels, sum });
        })
        .catch((res) => {
          ctx.commit("setMonthLoading", false);
          reject(res);
        });
    });
  },
};

const mutations = {
  setErr(state, error) {
    state.errors = error;
  },
  setMonthLoading(state, payload) {
    state.isMonthLoading = payload;
  },
  setLoading(state, payload) {
    state.isLoading = payload;
  },
  setItems(state, payload) {
    payload = payload == null ? [] : payload;
    state.datatable.data = payload;
  },
  setTopBranches(state, payload) {
    state.topBranches = payload;
  },
  setTopBranchesDataSets(state, payload) {
    state.topBranchesChartOptions.data.datasets[0].data = payload;
  },
  setTopBranchesColors(state, payload) {
    state.topBranchesChartOptions.data.datasets[0].backgroundColor = payload;
  },
  setTopBranchesLabels(state, payload) {
    state.topBranchesChartOptions.data.labels = payload;
  },
  setTopBranchesSum(state, payload) {
    state.topBranchesSum = payload;
  },
  setMonthlySalesDataSets(state, payload) {
    state.monthlySalesDatasets = payload;
  },
  setMonthlySalesSum(state, payload) {
    state.monthlySalesSum = payload;
  },
  setMonthlySalesLabels(state, payload) {
    state.monthlySalesLables = payload;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
