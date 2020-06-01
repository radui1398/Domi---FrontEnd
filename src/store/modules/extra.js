const state = {
  loaded: 0,
  target: 2
};

const mutations = {
  changeLoaded(state, number){
    state.loaded = number;
  },
  addOneLoad(state) {
    state.loaded += 1;
  }
};

const getters = {
  loaded: (state) => {
    return state.loaded === state.target;
  }
};

const actions = {
  setLoaded (context,params){
    context.commit('changeLoaded', params);
  },
  incLoad (context) {
    context.commit('addOneLoad');
  }
};

export default {
  state,
  mutations,
  getters,
  actions
}
