const getters = {
  nickName: state => state.user.nickName,
  userId:state => state.user.userId,
  asideStatus:state => state.settings.asideOpen
}
export default getters