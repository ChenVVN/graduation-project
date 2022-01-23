const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  mobile: state => state.user.mobile,
  username: state => state.user.username
}
export default getters
