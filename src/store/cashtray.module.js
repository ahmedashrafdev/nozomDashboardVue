// import axios from "axios";
import ApiService from "@/common/api.service";
// action types
export const GET_CASHTRAY = "getCashTray";
// mutation types
// import { i18n } from '@/common/plugins/vue-i18n.js'

const state = {
  errors: null,
  cashtrayStores:[],
  datatable: {
    search: "",
    headers: [
      {
        text: "TotalCash",
        value: "TotalCash",
        align: "left",
        sortable: false
      },
      { text: "TotalOrder", value: "TotalOrder" },
      { text: "TVisa", value: "TVisa" },
      { text: "TVoid", value: "TVoid" },
      { text: "MonthNo", value: "MonthNo" },
      { text: "AverageCash", value: "AverageCash" },
      { text: "NoOfCashTry", value: "NoOfCashTry" },
      { text: "AvgBasket", value: "AvgBasket" }
    ],
    cashtray: []
  },
  isLoading: false
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
  cashtrayStores(state){
    return state.cashtrayStores
  }
};

const actions = {
  getCashTray(ctx, payload) {
    ctx.commit("setLoading", true);
    // commit(mutations.setLoading, true);
    return new Promise(resolve => {
      ApiService.query("cashtry", payload)
        .then(res => {
          ctx.commit("setLoading", false);
          ctx.commit("setCashtray", res.data);
          resolve(res);
        })
        .catch(res => {
          ctx.commit("setLoading", false);
          ctx.commit("setErr", res);
        });
    });
  },
  getCashTrayStores(ctx) {
    ctx.commit("setLoading", true);
    // commit(mutations.setLoading, true);
    return new Promise(resolve => {
      ApiService.get("cashtry/stores")
        .then(res => {
          ctx.commit("setLoading", false);
          ctx.commit("setCashtrayStores", res.data);
          resolve(res);
        })
        .catch(res => {
          ctx.commit("setLoading", false);
          ctx.commit("setErr", res);
        });
    });
  }
};

const mutations = {
  setErr(state, error) {
    state.errors = error;
  },
  setLoading(state, payload) {
    state.isLoading = payload;
  },
  setCashtray(state, payload) {
    payload = payload == null ? [] : payload
    state.datatable.cashtray = payload;
  },
  setCashtrayStores(state, payload) {
    payload = payload == null ? [] : payload
    state.cashtrayStores = payload;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
