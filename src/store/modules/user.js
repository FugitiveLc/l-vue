import {login,getUserInfo} from "@/api/user"
import {removeToken} from '@/utils/token'
const defaultState= ()=>{   
  return {
    nickName:undefined
  }
}

const state = defaultState();

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, defaultState())
  },
  SET_NICKNAME: (state, nickName) => {
    state.nickName = nickName
  }
}

const actions ={
  async loginAction({ commit },userInfo){  //登录
      const {email,password} = userInfo; //获取登录表单
      return await login({email:email.trim(),password:password});
   },
   resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // 删除cookie中的token
      commit('RESET_STATE')
      resolve()
    })
  },
  getInfo({ commit }){  //获取用户信息
    return new Promise((resolve, reject)=>{
      getUserInfo().then(response=>{
        commit('SET_NICKNAME',response.data.nickName);
        resolve()
      }).catch(error => {
         reject(error)
      })
    })
  },
  logout({ commit }){
    removeToken() // 删除cookie中的token
    commit('RESET_STATE')
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}