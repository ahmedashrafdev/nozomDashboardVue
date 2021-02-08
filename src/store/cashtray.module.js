// import axios from "axios";
import ApiService from "@/common/api.service";
// action types
export const GET_CASHTRAY = "getCashTray";
// mutation types
// import { i18n } from '@/common/plugins/vue-i18n.js'
// import { i18n } from './i18n.js'
import i18n from "@/common/plugins/vue-i18n.js";
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
  isLoading: false,
};

const getters = {
  datatable(state) {
    return state.datatable;
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
                TotalCash: `${parseFloat(item.TotalCash).toFixed(2)} EGP`,
                TotalOrder: parseInt(item.TotalOrder),
                TVisa: `${parseFloat(item.TVisa).toFixed(2)} EGP`,
                TVoid: `${parseFloat(item.TVoid).toFixed(2)} EGP`,
                AverageCash: `${parseFloat(item.AverageCash).toFixed(2)} EGP`,
                NoOfCashTry: `${parseFloat(item.NoOfCashTry).toFixed(2)} EGP`,
                AvgBasket: `${parseFloat(item.AvgBasket).toFixed(2)} EGP`,
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
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
