<template>
  <b-navbar-nav class="ml-auto">
    <b-nav-item to="/">Home</b-nav-item>

    <b-nav-item-dropdown>
      <template v-slot:button-content>
        {{ currentUser.email }}
      </template>

      <b-dropdown-item href="#" @click="logout">Log out</b-dropdown-item>
      <b-dropdown-item href="#">Settings</b-dropdown-item>
      <b-dropdown-divider></b-dropdown-divider>
      <b-dropdown-item href="#">My Account</b-dropdown-item>
    </b-nav-item-dropdown>
  </b-navbar-nav>

</template>

<script>
  import Firebase from 'firebase';
  import {mapGetters} from "vuex";

  export default {
    methods: {
      logout(){
        Firebase.auth().signOut().then(()=>{
          this.$router.push('/auth/login')
        });
      }
    },
    computed: {
      ...mapGetters(['currentUser']),
    }
  }
</script>

<style>

</style>
