<template>
  <div id="app">
    <div class="main" v-if="this.currentUser">
      <v-header></v-header>

      <router-view v-if="loaded === true"></router-view>
      <div class="spinner" v-else>
        <b-spinner label="Loading..."></b-spinner>
      </div>

      <notifications></notifications>
      <v-footer></v-footer>
    </div>
    <router-view v-else></router-view>
    <notifications></notifications>
  </div>
</template>

<script>
  import 'bootstrap/dist/css/bootstrap.css'
  import 'bootstrap-vue/dist/bootstrap-vue.css'
  import 'vue-search-select/dist/VueSearchSelect.css'

  import {mapGetters} from "vuex";

  import Header from "./components/Structure/Header";
  import Footer from "./components/Structure/Footer";
  import {BIND_PROJECTS, BIND_RESOURCES} from "./store/actions.type";

  export default {
    components:{
      "v-header": Header,
      "v-footer": Footer
    },
    computed: {
      ...mapGetters(['currentUser', 'loaded']),
    },
    created(){
      this.$store.dispatch("setLoaded", 0);
    },
    mounted() {

      this.$store.dispatch(BIND_PROJECTS).then(data =>{
        this.$store.dispatch("incLoad");

        this.$store.dispatch(BIND_RESOURCES, data).then(data => {
          this.$store.dispatch("incLoad")
        });
      });
    }
  }
</script>

<style lang="scss">
  @import "./assets/scss/main.scss";
</style>
