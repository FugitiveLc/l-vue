const getters = {
  token: state => state.user.token,
  asideStatus:state => state.settings.asideOpen
}
export default getters