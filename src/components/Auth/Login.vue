<template>
  <div class="auth-form">
    <b-form-group label="Email">
      <b-input type="text" placeholder="Email.." :state="validateState($v.email)" v-model="email"></b-input>
    </b-form-group>

    <b-form-group label="Parola">
      <b-input type="password" placeholder="Parola.." v-model="password" :state="validateState($v.password)"></b-input>
    </b-form-group>

    <b-button variant="primary" @click.prevent="login">
      Autentificare
    </b-button>

    <b-button to="/auth/register" variant="light" class="floating-button-bottom-right">
      Inregistrare
    </b-button>
  </div>
</template>

<script>
  import Firebase from 'firebase';
  import {store} from '../../store/store';
  import { validationMixin } from "vuelidate";
  import { required, minLength, email} from 'vuelidate/lib/validators'



  Firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      store.dispatch('setUser', user);
    } else {
      store.dispatch('setUser', null);
    }
  });

  export default {
    validationMixin,
    data() {
      return {
        email: '',
        password: '',
        request: false
      }
    },
    methods: {
      login() {
        if (!this.$v.$invalid) {
          const vueInstance = this;
          this.request = true;

          Firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(result => {
            if (result) {
              vueInstance.$notify('Logged In');
              vueInstance.$router.push({name: 'home'});
            }
            vueInstance.request = false;
          }).catch(error => {
            const errMsg = error.message;

            vueInstance.$notify(errMsg);
            vueInstance.request = false;
          });
        } else {
          this.$notify('Te rog sa completezi toate campurile.')
        }
      },
      validateState(field) {
        const { $invalid } = field;
        return !$invalid;
      },
    },
    validations: {
      email: {
        required,
        minLength: minLength(4),
        email
      },
      password: {
        required,
        minLength: minLength(6)
      }
    }

  }
</script>

<style lang="scss" scoped>
  .floating-button-bottom-right{
    position: fixed;
    bottom: 20px;
    right: 30px;
    z-index: 10;
  }
</style>
