import { getToken, removeToken, setToken } from '@/utils/auth'
import { getInfoApi, loginApi } from '@/api/log'
import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'
import { Message } from 'element-ui'
import {yhxqApi} from "@/api/hqyhxx";

Vue.use(Vuex)

export default new Vuex.Store({
  // 定义数据
  state: {
    token: getToken() || '',
    shopInfo: {},
     imglo:''
  },
  // 定义计算属性
  getters: {
    nickname: state => state.shopInfo.nickname || ''
  },
  // 定义修改操作
  mutations: {
    SET_TOKEN (state, token) {
      state.token = token
      setToken(token)
    },
    SET_SHOP_INFO (state, info) {
      state.shopInfo = info
    },
    SET_IMG_LO(state,img){
      state.imglo=img
      console.log(state.imglo)
    },
    RESET_STATE (state) {
      removeToken()
      state.token = ''
      state.shopInfo = {}
      state.imglo=''
    }
  },
  // 定义逻辑操作
  actions: {
    // 登录操作
    async login({commit, dispatch, getters }, info) {
      // 1. 发起请求
      const {data} = await getInfoApi(info)
      console.log(data)
      // 2. 存储token
      commit('SET_TOKEN', data)
      // await dispatch('getShopInfo')
      await router.push('/rotation')
      Message.success('登录成功')
    },
    // 获取商家信
    // async getShopInfo({ commit }) {
    //   // 1. 发起请求
    //   const { data } = await yhxqApi()
    //   // 2. 存储商家信息
    //   commit('SET_SHOP_INFO', data || {})
    // }
  }
})
