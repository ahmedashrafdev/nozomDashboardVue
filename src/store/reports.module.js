// import axios from "axios";
import ApiService from "@/common/api.service";
import i18n from '@/common/plugins/vue-i18n.js'
const state = {
  errors: null,
  datatable: {
    search: "",
    headers: [
      { text: i18n.t('ItemName'), value: "ItemName" },
      { text: i18n.t('TotalAmount'), value: "TotalAmount" },
      { text: i18n.t('TotalQnt'), value: "TotalQnt" },
      { text: i18n.t('Profit'), value: "Profit" },
      { text: i18n.t('Disc'), value: "Disc" }
    ],
    data: [],
  },
  topBranches : [],
  isLoading: false,
};

const getters = {
  datatable(state) {
    return state.datatable;
  },
  isLoading(state) {
    return state.isLoading;
  },
  topBranches(state) {
    return state.topBranches
  }

};

const actions = {
  getTopItems(ctx, payload) {
    ctx.commit("setLoading", true);
    // commit(mutations.setLoading, true);
    return new Promise((resolve) => {
      ApiService.query("top", payload)
        .then((res) => {
          ctx.commit("setItems", []);
          const data = res.data.map(item =>{
              return {
                ItemName:item.ItemName,
                TotalAmount:parseFloat(item.TotalAmount).toFixed(2),
                TotalQnt:parseFloat(item.TotalQnt).toFixed(2),
                Profit:parseFloat(item.Profit).toFixed(2),
                Disc:parseFloat(item.Disc).toFixed(2),
              }
          });
          ctx.commit("setItems", data);
          ctx.commit("setLoading", false);

          resolve(data);
        })
        .catch((res) => {
          ctx.commit("setLoading", false);
          ctx.commit("setErr", res);
        });
    });
  },
  getTopBranches(ctx, payload) {
    ctx.commit("setLoading", true);
    // commit(mutations.setLoading, true);
    return new Promise((resolve) => {
      ApiService.query("branches-sales", payload)
        .then((res) => {
          
          ctx.commit("setLoading", false);

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
  setItems(state, payload) {
    payload = payload == null ? [] : payload;
    state.datatable.data = payload;
  },
  setTopBranches(state, payload) {
    payload = payload == null ? [] : payload;
    state.datatable.data = payload;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
