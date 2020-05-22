import {firestoreAction} from "vuexfire";
import {db} from "../../firebaseConfig";
import {deleteQueryBatch} from "../util/delete";

const state = {
  resources: []
};

const mutations = {
  addResource (state, resource){
    db.collection("resources").add(resource);
  },
  deleteResource(state, resourceId){
    db.collection('resources').doc(resourceId).delete();
  },
  deleteResourcesFromProject(state, projectId){
    const readyToBeDeleted = db.collection('resources').where('project','==', projectId);

    return new Promise((resolve, reject) => {
      deleteQueryBatch(db, readyToBeDeleted, resolve, reject);
    });
  }
};

const getters = {
  resources: state => state.resources,
  resource: (state) => (resourceId) => {
    return state.resources.find(resource => resource.id === resourceId);
  },
  resourcesAsRef: (state) => (resourceId = null) => {
    const usable = [];

    const coll = state.resources.filter(resource => resource.usable === true && resource.id !== resourceId);

    coll.forEach(resource => {
      usable.push({value: resource.id, text: resource.name + ' (Ref)'})
    });

    return usable;
  }
};

const actions = {
  addResource(context, data) {
    context.commit('addResource', data);
  },
  deleteResource(context, params){
    context.commit('deleteResource', params);
  },
  bindResourcesRef: firestoreAction((context,projectId) => {
    return context
      .bindFirestoreRef('resources', db.collection('resources')
        .where('project', '==', projectId))
  }),
};

export default {
  state,
  mutations,
  getters,
  actions
}
