import {firestoreAction} from 'vuexfire'
import {db} from "../../firebaseConfig";

const state = {
  projects: [],
  currentProject: null
};

const mutations = {
  addProject(state, project) {
    db.collection("projects").add(project);
  },
  deleteProject(state, projectId) {
    db.collection("projects").doc(projectId).delete();
  }
};

const getters = {
  projects: state => state.projects,
  currentProject: state => state.currentProject,
  project: (state) => (projectId) => {
    state.currentProject = projectId;
    return state.projects.find(project => project.id === projectId);
  }
};

const actions = {
  addProject(context, project) {
    context.commit('addProject', project);
  },
  deleteProject(context, projectId) {
    context.commit('deleteProject', projectId);
    context.commit('deleteResourcesFromProject', projectId);
  },
  bindProjectsRef: firestoreAction((context, user) => {
    return context.bindFirestoreRef('projects', db.collection('projects').where('user', '==', user.uid))
  }),
};

export default {
  state,
  mutations,
  getters,
  actions
}
