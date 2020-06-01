import {firestoreAction} from 'vuexfire'
import {db} from "../../firebaseConfig";
import {ADD_PROJECT, BIND_PROJECTS, SAVE_PROJECT} from "../actions.type";
import {SET_PROJECT, UPDATE_PROJECT} from "../mutations.type";

const state = {
  projects: []
};

const mutations = {
  [SET_PROJECT](state, project) {
  },
  deleteProject(state, projectId) {
  },
  [UPDATE_PROJECT](state, project) {
  }
};

const getters = {
  projects: state => state.projects,
  currentProject: state => state.currentProject,
  project: (state) => (projectId) => {
    return state.projects.find(project => project.id === projectId);
  }
};

const actions = {
  [ADD_PROJECT](context, project) {
    db.collection("projects").add(project).then(data => {
      context.commit(SET_PROJECT, data);
    });
  },
  deleteProject(context, projectId) {
    db.collection("projects").doc(projectId).delete().then(data => {
      context.commit('deleteProject', projectId);
      context.commit('deleteResourcesFromProject', projectId);
    });
  },
  [SAVE_PROJECT](context, project){
    db.collection("projects").doc(project.id).update(project).then(data => {
      context.commit(UPDATE_PROJECT, project);
    });
  },
  [BIND_PROJECTS]: firestoreAction((context) => {
    return context.bindFirestoreRef('projects', db.collection('projects').where('user', '==', context.getters.currentUser.uid))
  })
};

export default {
  state,
  mutations,
  getters,
  actions
}
