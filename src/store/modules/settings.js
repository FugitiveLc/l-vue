const state ={
  asideOpen:false
}

const mutations = {
  CHANGE_ASIDE_STATUS: (state ) => {
    state.asideOpen =!state.asideOpen
  }
}

export default {
  namespaced: true,
  state,
  mutations
}