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
        { align : "center"  , text: i18n.t('Buy'), value: "Buy"},
        { align : "center"  , text: i18n.t('ReturnBuy'), value: "ReturnBuy"},
        { align : "center"  , text: i18n.t('Discount'), value: "Discount"},
        { align : "center"  , text: i18n.t('NetBuy'), value: "NetBuy"},
        { align : "center"  , text: i18n.t('Paid'), value: "Paid"},
        { align : "center"  , text: i18n.t('CHEQUE'), value: "CHEQUE"},
        { align : "center"  , text: i18n.t('CHQUnderCollec'), value: "CHQUnderCollec"},
        { align : "center"  , text: i18n.t('BalanceDebit'), value: "BalanceDebit"},
        { align : "center"  , text: i18n.t('BalanceCredit'), value: "BalanceCredit"},
    ],
    totals: {},
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
              let totals = {
                DBT : 0,
                CRDT : 0,
                Buy : 0,
                ReturnBuy : 0,
                Discount : 0,
                NetBuy : 0,
                Paid : 0,
                CHEQUE : 0,
                CHQUnderCollec : 0,
                BalanceDebit : 0,
                BalanceCredit : 0,
              }
              const data = res.data.map((item) => {
                const NetBuy =  item.Buy - item.ReturnBuy - item.Discount
                let BalanceCredit =  0
                let BalanceDebit = 0 
                const Balance =  NetBuy + item.CRDT - item.Paid - item.CHEQUE -item.DBT
                
                if(Balance > 0){
                   BalanceCredit =  Balance
                } else {
                  BalanceDebit = ~Balance + 1
                }
                console.log(item)
                totals.DBT =parseFloat(totals.DBT) + parseFloat(item.DBT)
                totals.CRDT =parseFloat(totals.CRDT) + parseFloat(item.CRDT)
                totals.Buy =parseFloat(totals.Buy) + parseFloat(item.Buy)
                totals.ReturnBuy =parseFloat(totals.ReturnBuy) + parseFloat(item.ReturnBuy)
                totals.Discount =parseFloat(totals.CRDT) + parseFloat(item.CRDT)
                totals.NetBuy =parseFloat(totals.NetBuy) + parseFloat(NetBuy)
                totals.Paid =parseFloat(totals.Paid) + parseFloat(item.Paid)
                totals.CHEQUE =parseFloat(totals.CHEQUE) + parseFloat(item.CHEQUE)
                totals.CHQUnderCollec =parseFloat(totals.CHQUnderCollec) + parseFloat(item.CHQUnderCollec)
                totals.BalanceDebit =parseFloat(totals.BalanceDebit) + parseFloat(BalanceDebit)
                totals.BalanceCredit =parseFloat(totals.BalanceCredit) + parseFloat(BalanceCredit)
                return {
                    AccountCode : item.AccountCode, 
                    AccountName : item.AccountName, 
                    DBT : `${numberWithCommas(parseFloat(item.DBT).toFixed(2))} EGP`, 
                    NetBuy : `${numberWithCommas(parseFloat(NetBuy).toFixed(2))} EGP`, 
                    BalanceDebit : `${numberWithCommas(parseFloat(BalanceDebit).toFixed(2))} EGP`, 
                    BalanceCredit : `${numberWithCommas(parseFloat(BalanceCredit).toFixed(2))} EGP`, 
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
              ctx.commit("setTotals", totals);
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
  setTotals(state, payload) {
    state.SuppliersDatatable.totals = payload;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
