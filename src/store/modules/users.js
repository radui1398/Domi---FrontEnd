import {UPDATE_USER} from "../mutations.type";
import {SET_USER} from "../actions.type";

const state = {
  currentUser: null
};

const mutations = {
  [UPDATE_USER](state, user){
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
  [SET_USER](context, user){
    context.commit(UPDATE_USER, user);
  }
};

export default {
  state,
  mutations,
  getters,
  actions
}
