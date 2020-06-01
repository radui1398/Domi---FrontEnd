import Firebase from "firebase/app";
import {store} from "../store/store";
import {SET_USER} from "../store/actions.type";

export default () => {
  Firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      store.dispatch(SET_USER, user);
    } else {
      store.dispatch(SET_USER, null);
    }
  });
}
