// import axios from "axios";
import ApiService from "@/common/api.service";
// action types
export const GET_CASHTRAY = "getCashTray";
// mutation types
// import { i18n } from '@/common/plugins/vue-i18n.js'
// import { i18n } from './i18n.js' 
import i18n from '@/common/plugins/vue-i18n.js'
const state = {
  errors: null,
  cashtrayStores: [],
  datatable: {
    search: "",
    headers: [
      { text: i18n.t('MonthNo'), value: "MonthNo" },
      { text: i18n.t('TotalCash'), value: "TotalCash" },
      { text: i18n.t('TotalOrder'), value: "TotalOrder" },
      { text: i18n.t('TVisa'), value: "TVisa" },
      { text: i18n.t('TVoid'), value: "TVoid" },
      { text: i18n.t('AverageCash'), value: "AverageCash" },
      { text: i18n.t('NoOfCashTry'), value: "NoOfCashTry" },
      { text: i18n.t('AvgBasket'), value: "AvgBasket" }
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
    return new Promise((resolve) => {
      ApiService.query("cashtry", payload)
        .then((res) => {
          ctx.commit("setLoading", false);
          const data = res.data.map(item =>{
              return {
                MonthNo : i18n.t(`mo${item.MonthNo}`),
                TotalCash:parseFloat(item.TotalCash).toFixed(2),
                TotalOrder:parseFloat(item.TotalOrder).toFixed(2),
                TVisa:parseFloat(item.TVisa).toFixed(2),
                TVoid:parseFloat(item.TVoid).toFixed(2),
                AverageCash:parseFloat(item.AverageCash).toFixed(2),
                NoOfCashTry:parseFloat(item.NoOfCashTry).toFixed(2),
                AvgBasket:parseFloat(item.AvgBasket).toFixed(2),
              }
          });
          ctx.commit("setCashtray", data);
          resolve(data);
        })
        .catch((res) => {
          ctx.commit("setLoading", false);
          ctx.commit("setErr", res);
        });
    });
  },
  getCashTrayStores(ctx) {
    ctx.commit("setLoading", true);
    // commit(mutations.setLoading, true);
    return new Promise((resolve) => {
      ApiService.get("cashtry/stores")
        .then((res) => {
          ctx.commit("setLoading", false);
          ctx.commit("setCashtrayStores", res.data);
          resolve(res.data);
        })
        .catch((res) => {
          ctx.commit("setLoading", false);
          ctx.commit("setErr", res);
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
