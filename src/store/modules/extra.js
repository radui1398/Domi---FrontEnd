const state = {
  params: null,
};

const mutations = {
  setParams(state, params){
    state.params = params;
  }
};

const getters = {
  params: (state) => state.params

};

const actions = {
  setParams (context,params){
    context.commit('setParams', params);
  }
};

export default {
  state,
  mutations,
  getters,
  actions
}
