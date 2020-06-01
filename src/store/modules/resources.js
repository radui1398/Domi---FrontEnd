import {firestoreAction} from "vuexfire";
import {db} from "../../firebaseConfig";
import deleteQueryBatch from "../../utils/deleteQuery";
import {ADD_RESOURCE, BIND_RESOURCES, DELETE_RESOURCE, SAVE_RESOURCE} from "../actions.type";
import {REMOVE_RESOURCE, SET_RESOURCE} from "../mutations.type";

const state = {
  resources: []
};

const mutations = {
  [SET_RESOURCE](state, resource) {
  },
  [REMOVE_RESOURCE](state, resourceId) {
  },
  deleteResourcesFromProject(state, projectId) {
    const readyToBeDeleted = db.collection('resources').where('project', '==', projectId);

    return new Promise((resolve, reject) => {
      deleteQueryBatch(db, readyToBeDeleted, resolve, reject);
    });
  }
};

const getters = {
  resources: state => (projectId) => state.resources.filter(resource => {
    if(resource.project === projectId)
      return resource;
  }),
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
  [ADD_RESOURCE](context, data) {
    db.collection("resources").add(data).then(data => {
      context.commit(SET_RESOURCE, data);
    });
  },
  [DELETE_RESOURCE](context, params) {
    db.collection('resources').doc(params).delete().then(data => {
      context.commit(REMOVE_RESOURCE, params);
    });
  },
  [SAVE_RESOURCE](context, params) {
    db.collection("resources").doc(params.id).update(params).then(data => {
      return true
    }).catch(error => {
      return error;
    })
  },
  [BIND_RESOURCES]: firestoreAction((context, projects) => {
    const ids = projects.map(project => {
      return project.id
    });

    return context
      .bindFirestoreRef('resources', db.collection('resources')
        .where('project', 'in', ids));
  }),
};

export default {
  state,
  mutations,
  getters,
  actions
}
