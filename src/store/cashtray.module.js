// import axios from "axios";
import ApiService from "@/common/api.service";
import hdate from 'human-date'
// action types
export const GET_CASHTRAY = "getCashTray";
// mutation types
// import { i18n } from '@/common/plugins/vue-i18n.js'
// import { i18n } from './i18n.js'
import i18n from "@/common/plugins/vue-i18n.js";
const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
const state = {
  errors: null,
  cashtrayStores: [],
  datatable: {
    search: "",
    headers: [
      { align: "center", text: i18n.t("MonthNo"), value: "MonthNo" },
      { align: "center", text: i18n.t("TotalCash"), value: "TotalCash" },
      { align: "center", text: i18n.t("TotalOrder"), value: "TotalOrder" },
      { align: "center", text: i18n.t("TVisa"), value: "TVisa" },
      { align: "center", text: i18n.t("TVoid"), value: "TVoid" },
      { align: "center", text: i18n.t("AverageCash"), value: "AverageCash" },
      { align: "center", text: i18n.t("NoOfCashTry"), value: "NoOfCashTry" },
      { align: "center", text: i18n.t("AvgBasket"), value: "AvgBasket" },
    ],
    cashtray: [],
  },
  flowDatatable:{
    search: "",
    headers: [
      { align: "center", text: i18n.t("DocDate"), value: "DocDate" },
      { align: "center", text: i18n.t("Income"), value: "Income" },
      { align: "center", text: i18n.t("Supplier"), value: "Supplier" },
      { align: "center", text: i18n.t("Expensis"), value: "Expensis" },
      { align: "center", text: i18n.t("Others"), value: "Others" },
      { align: "center", text: i18n.t("Bankin"), value: "Bankin" },
      { align: "center", text: i18n.t("Cheqout"), value: "Cheqout" },
      { align: "center", text: i18n.t("Cheqin"), value: "Cheqin" },
    ],
    data: [],
  },
  OpenCashtryDatatable: {
    search: "",
    headers: [
      { align: "center", text: i18n.t("StoreName"), value: "StoreName" },
      {
        filterable: false,
        align: "center",
        text: i18n.t("OpenDate"),
        value: "OpenDate",
      },
      {
        filterable: false,
        align: "center",
        text: i18n.t("TotalOrder"),
        value: "TotalOrder",
      },
      {
        filterable: false,
        align: "center",
        text: i18n.t("TotalCash"),
        value: "TotalCash",
      },
      {
        filterable: false,
        align: "center",
        text: i18n.t("TVisa"),
        value: "TotalVisa",
      },
      
    ],
    data: [],
    totalCashSum:null,
    totalVisaSum:null,
  },
  isLoading: false,
};

const getters = {
  datatable(state) {
    return state.datatable;
  },
  flowDatatable(state) {
    return state.flowDatatable;
  },
  isLoading(state) {
    return state.isLoading;
  },
  isAuthenticated(state) {
    return state.isAuthenticated;
  },
  cashtrayStores(state) {
    return state.cashtrayStores;
  },
  OpenCashtryDatatable(state) {
    return state.OpenCashtryDatatable;
  },
};

const actions = {
  getCashTray(ctx, payload) {
    ctx.commit("setLoading", true);
    // commit(mutations.setLoading, true);
    return new Promise((resolve, reject) => {
      ApiService.query("cashtry", payload)
        .then((res) => {
          ctx.commit("setLoading", false);
          ctx.commit("setCashtray", []);
          if (res.data.length > 0) {
            const data = res.data.map((item) => {
              return {
                MonthNo: i18n.t(`mo${item.MonthNo}`),
                TotalCash: `${numberWithCommas(parseFloat(item.TotalCash).toFixed(2))} EGP`,
                TotalOrder: parseInt(item.TotalOrder),
                TVisa: `${numberWithCommas(parseFloat(item.TVisa).toFixed(2))} EGP`,
                TVoid: `${numberWithCommas(parseFloat(item.TVoid).toFixed(2))} EGP`,
                AverageCash: `${numberWithCommas(parseFloat(item.AverageCash).toFixed(2))} EGP`,
                NoOfCashTry: `${numberWithCommas(parseFloat(item.NoOfCashTry).toFixed(2))} EGP`,
                AvgBasket: `${numberWithCommas(parseFloat(item.AvgBasket).toFixed(2))} EGP`,
              };
            });
            ctx.commit("setCashtray", data);
            resolve(data);
          }
        })
        .catch((res) => {
          ctx.commit("setLoading", false);
          reject(res);
        });
    });
  },
  getCashFlow(ctx, payload) {
    ctx.commit("setLoading", true);
    // commit(mutations.setLoading, true);
    return new Promise((resolve, reject) => {
      ApiService.query("cash-flow-year", payload)
        .then((res) => {
          ctx.commit("setLoading", false);
          ctx.commit("setCashFlow", []);
          if (res.data.length > 0) {
            const data = res.data.map((item) => {
              return {
                DocDate: i18n.t(`mo${item.DocDate}`),
                Income: `${numberWithCommas(parseFloat(item.Income).toFixed(2))} EGP`,
                Supplier: parseInt(item.Supplier),
                Expensis: `${numberWithCommas(parseFloat(item.Expensis).toFixed(2))} EGP`,
                Others: `${numberWithCommas(parseFloat(item.Others).toFixed(2))} EGP`,
                Bankin: `${numberWithCommas(parseFloat(item.Bankin).toFixed(2))} EGP`,
                Cheqout: `${numberWithCommas(parseFloat(item.Cheqout).toFixed(2))} EGP`,
                Cheqin: `${numberWithCommas(parseFloat(item.Cheqin).toFixed(2))} EGP`,
              };
            });
            ctx.commit("setCashFlow", data);
            resolve(data);
          }
        })
        .catch((res) => {
          ctx.commit("setLoading", false);
          reject(res);
        });
    });
  },

  getCashFlowDate(ctx, payload) {
    ctx.commit("setLoading", true);
    // commit(mutations.setLoading, true);
    return new Promise((resolve, reject) => {
      ApiService.query("cash-flow", payload)
        .then((res) => {
          ctx.commit("setLoading", false);
          ctx.commit("setCashFlow", []);
          if (res.data.length > 0) {
            const data = res.data.map((item) => {
              return {
                DocDate: i18n.t(`mo${item.DocDate}`),
                Income: `${numberWithCommas(parseFloat(item.Income).toFixed(2))} EGP`,
                Supplier: parseInt(item.Supplier),
                Expensis: `${numberWithCommas(parseFloat(item.Expensis).toFixed(2))} EGP`,
                Others: `${numberWithCommas(parseFloat(item.Others).toFixed(2))} EGP`,
                Bankin: `${numberWithCommas(parseFloat(item.Bankin).toFixed(2))} EGP`,
                Cheqout: `${numberWithCommas(parseFloat(item.Cheqout).toFixed(2))} EGP`,
                Cheqin: `${numberWithCommas(parseFloat(item.Cheqin).toFixed(2))} EGP`,
              };
            });
            ctx.commit("setCashFlow", data);
            resolve(data);
          }
        })
        .catch((res) => {
          ctx.commit("setLoading", false);
          reject(res);
        });
    });
  },

  getOpenCashTray(ctx) {
    ctx.commit("setLoading", true);
    // commit(mutations.setLoading, true);
    return new Promise((resolve, reject) => {
      ApiService.get("cashtry/open")
        .then((res) => {
          ctx.commit("setLoading", false);
          ctx.commit("setOpenCashtray", []);
          if (res.data.length > 0) {
            let totalCashSum = 0;
            let totalVisaSum = 0;
            const data = res.data.map((item) => {
              totalCashSum = totalCashSum + item.TotalCash
              totalVisaSum = totalVisaSum + item.TotalVisa
              let date = item.OpenDate.split('T')[0]
              date = hdate.prettyPrint(new Date(Date.parse(date)))
              return {
                OpenDate:  date,
                TotalCash: `${numberWithCommas(parseFloat(item.TotalCash).toFixed(2))} EGP`,
                TotalOrder: `${numberWithCommas(parseInt(item.TotalOrder))}`,
                TotalVisa: `${numberWithCommas(parseFloat(item.TotalVisa).toFixed(2))} EGP`,
                StoreName: item.StoreName,
              };
            });
            ctx.commit("setOpenCashtray", data);
            ctx.commit("setCashtrayTotalCashSum", totalCashSum);
            ctx.commit("setCashtrayTotalVisaSum", totalVisaSum);
            resolve(data);
          }
        })
        .catch((res) => {
          ctx.commit("setLoading", false);
          reject(res);
        });
    });
  },
  getCashTrayStores(ctx) {
    ctx.commit("setLoading", true);
    // commit(mutations.setLoading, true);
    return new Promise((resolve, reject) => {
      ApiService.get("cashtry/stores")
        .then((res) => {
          ctx.commit("setLoading", false);
          ctx.commit("setCashtrayStores", res.data);
          resolve(res.data);
        })
        .catch((res) => {
          ctx.commit("setLoading", false);
          reject(res);
        });
    });
  },
};

const mutations = {
  setErr(state, error) {
    state.errors = error;
  },
  setCashFlow(state, payload) {
    state.flowDatatable.data = payload;
  },
  setOpenCashtray(state, payload) {
    state.OpenCashtryDatatable.data = payload;
  },
  setLoading(state, payload) {
    state.isLoading = payload;
  },
  setCashtray(state, payload) {
    payload = payload == null ? [] : payload;
    state.datatable.cashtray = payload;
  },
  setCashtrayStores(state, payload) {
    payload = payload == null ? [] : payload;
    state.cashtrayStores = payload;
  },
  setCashtrayTotalCashSum(state, payload) {
    state.OpenCashtryDatatable.totalCashSum = numberWithCommas(parseFloat(payload).toFixed(2));
  },
  setCashtrayTotalVisaSum(state, payload) {
    state.OpenCashtryDatatable.totalVisaSum = numberWithCommas(parseFloat(payload).toFixed(2));
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
