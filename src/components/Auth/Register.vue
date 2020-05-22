<template>
  <div class="auth-form">
    <form>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" class="form-control" :class="errors.email" placeholder="Email" v-model="email">
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" class="form-control" :class="errors.password" placeholder="Password (min.6)" v-model="password">
      </div>
      <div class="form-group">
        <label for="repeat">Repeat Password</label>
        <input type="password" id="repeat" class="form-control" :class="errors.repeat" placeholder="Repeat Password" v-model="repeat">
      </div>
      <button class="btn btn-black" @click.prevent="register">Register</button>
      <router-link to="/auth/login"><button class="btn btn-secondary">Login</button></router-link>
    </form>
  </div>
</template>

<script>
  import Firebase from 'firebase';
  import {store} from "../../store/store";

  export default {
    methods: {
      register() {
        if(!this.errors.email && !this.errors.password && !this.errors.repeat) {
          const vueInstance = this;

          Firebase.auth().createUserWithEmailAndPassword(this.email, this.password).catch(error => {
            const errMsg = error.message;

            vueInstance.$notify(errMsg);
          }).then(user => {
            if(user){
              vueInstance.$notify('The user was registered');
            }
          })
        }else{
          this.$notify('Invalid register.')
        }
      }
    },
    watch: {
      email(){
        const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;

        this.errors.email = (reg.test(this.email))?null:'error';
      },
      password(){
        this.errors.password = (this.password.length > 5)?null:'error';
      },
      repeat(){
        this.errors.repeat = (this.password === this.repeat)?null:'error';
      },

    },
    data(){
      return {
        email: '',
        password: '',
        repeat: '',
        errors: {
          email: 'err',
          password: 'err',
          repeat: ''
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .error{
    border: 1px solid red !important;

    &:focus {
       box-shadow: 0 0 0 0.2rem rgba(255, 40, 0, 0.25)
     }
  }
</style>
