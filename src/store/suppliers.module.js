// import axios from "axios";
import ApiService from "@/common/api.service";
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
  SuppliersDatatable: {
    search: "",
    headers: [
        { align : "center"  , text: i18n.t('AccountCode'), value: "AccountCode"},
        { align : "center"  , text: i18n.t('AccountName'), value: "AccountName"},
        { align : "center"  , text: i18n.t('DBT'), value: "DBT"},
        { align : "center"  , text: i18n.t('CRDT'), value: "CRDT"},
        { align : "center"  , text: i18n.t('ReturnBuy'), value: "ReturnBuy"},
        { align : "center"  , text: i18n.t('Buy'), value: "Buy"},
        { align : "center"  , text: i18n.t('Paid'), value: "Paid"},
        { align : "center"  , text: i18n.t('CHEQUE'), value: "CHEQUE"},
        { align : "center"  , text: i18n.t('CHQUnderCollec'), value: "CHQUnderCollec"},
        { align : "center"  , text: i18n.t('Discount'), value: "Discount"},
    ],
    data: [],
  },
  isLoading: false,
};

const getters = {
  datatable(state) {
    return state.SuppliersDatatable;
  },
  isLoading(state) {
    return state.isLoading;
  },
  
};

const actions = {
  
    getSuppliersBalance(ctx) {
    ctx.commit("setLoading", true);
    // commit(mutations.setLoading, true);
    return new Promise((resolve, reject) => {
      ApiService.list("supplier-balance")
        .then((res) => {
            ctx.commit("setLoading", false);
            ctx.commit("setDatatable", []);
            if (res.data.length > 0) {
              const data = res.data.map((item) => {
                return {
                    AccountCode : item.AccountCode, 
                    AccountName : item.AccountName, 
                    DBT : `${numberWithCommas(parseFloat(item.DBT).toFixed(2))} EGP`, 
                    CRDT : `${numberWithCommas(parseFloat(item.CRDT).toFixed(2))} EGP`, 
                    ReturnBuy : `${numberWithCommas(parseFloat(item.ReturnBuy).toFixed(2))} EGP`, 
                    Buy : `${numberWithCommas(parseFloat(item.Buy).toFixed(2))} EGP`, 
                    Paid : `${numberWithCommas(parseFloat(item.Paid).toFixed(2))} EGP`, 
                    CHEQUE : `${numberWithCommas(parseFloat(item.CHEQUE).toFixed(2))} EGP`, 
                    CHQUnderCollec : `${numberWithCommas(parseFloat(item.CHQUnderCollec).toFixed(2))} EGP`, 
                    Discount : `${numberWithCommas(parseFloat(item.Discount).toFixed(2))} EGP`, 
                };
              });
              ctx.commit("setDatatable", data);
              resolve(data);
            }
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
  setDatatable(state, payload) {
    state.SuppliersDatatable.data = payload;
  },
  setLoading(state, payload) {
    state.isLoading = payload;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
