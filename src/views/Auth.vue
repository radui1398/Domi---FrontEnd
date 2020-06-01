<template>
  <div class="auth-container">
    <div id="stars"></div>
    <div id="stars2"></div>
    <div id="stars3"></div>

    <div class="auth">
      <v-register v-if="action === 'register'" />
      <v-login v-else />
    </div>
  </div>
</template>

<script>
  import Login from "./../components/Auth/Login";
  import Register from "./../components/Auth/Register";

  export default {
    computed: {
      action(){
        return this.$route.params.action;
      }
    },
    components: {
      "v-login": Login,
      "v-register": Register
    }
  }
</script>

<style>

</style>
