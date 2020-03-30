import {login} from "@/api/user"


const defaultState= ()=>{   
  return {
    token:undefined,
    email:''
  }
}

const state = defaultState();

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, defaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_EMAIL: (state, email) => {
    state.email = email
  },
}

const actions ={
   loginAction({ commit },userInfo){  //登录
      console.log(userInfo)
      const {email,password} = userInfo; //获取登录表单
      return new Promise((resolve, reject) => {
        login({ email: email.trim(), password: password }).then(response => {
          const { data } = response
          commit('SET_TOKEN', data.token)
          setToken(data.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })    
      
   }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}