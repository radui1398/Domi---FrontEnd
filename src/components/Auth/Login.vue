<template>
  <div class="auth-form">
    <b-form-group label="Email">
      <b-input type="text" placeholder="Email.." :state="stateOf($v.email)" v-model="email"></b-input>
    </b-form-group>

    <b-form-group label="Parola">
      <b-input type="password" placeholder="Parola.." v-model="password" :state="stateOf($v.password)"></b-input>
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
  import authListener from "../../utils/firebaseAuthStateChange";
  import validateMixin from "../../mixins/validate.mixins";

  authListener();

  export default {
    mixins: [validateMixin.login],
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

          Firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(result => {
            if (result) {
              this.$notify('Logged In');
              this.$router.push({name: 'home'});
            }

            this.request = false;
          }).catch(error => {
            const errMsg = error.message;

            this.$notify(errMsg);
            this.request = false;
          });

        } else {
          this.$notify('Te rog sa completezi toate campurile.')
        }
      }
    }
  }
</script>

<style>

</style>
