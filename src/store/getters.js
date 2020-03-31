const getters = {
  nickName: state => state.user.nickName,
  asideStatus:state => state.settings.asideOpen
}
export default getters