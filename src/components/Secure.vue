<template>
  <div class="main">
    <v-header></v-header>
    <router-view></router-view>
    <v-footer></v-footer>
  </div>
</template>

<script>
  import Header from './Header/Header';
  import Footer from './Footer/Footer';

  export default {
    data() {
      return {}
    },
    components: {
      vHeader: Header,
      vFooter: Footer
    },
    created() {
      this.$store.dispatch('bindProjectsRef', this.$store.getters.currentUser)
      console.log(this.$store.getters.currentUser.xa);
    },

  }
</script>

<style lang="scss">
  .main {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .menu-panel {
    display: flex;
    padding: 20px;
    background-color: #f7f7f7;
    border-radius: 5px;
  }
</style>
