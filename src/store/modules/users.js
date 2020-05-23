const state = {
  currentUser: null
};

const mutations = {
  userStatus(state, user){
    if(user){
      state.currentUser = user;
    }else{
      state.currentUser = null;
    }
  }
};

const getters = {
  currentUser: state => state.currentUser
};

const actions = {
  setUser(context, user){
    context.commit('userStatus', user);
  }
};

export default {
  state,
  mutations,
  getters,
  actions
}
