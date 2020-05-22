<template>
  <div id="app">
    <router-view></router-view>
    <notifications></notifications>
  </div>
</template>

<script>
  import 'bootstrap/dist/css/bootstrap.css'
  import 'bootstrap-vue/dist/bootstrap-vue.css'
  import 'vue-search-select/dist/VueSearchSelect.css'

  export default {

  }
</script>

<style lang="scss">
  body{
    margin: 0;
    font-family: "Lato", sans-serif;
  }

  html, body {
    height: 100%;
  }

  #app {
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
  }

  .btn-black{
    background-color: #000 !important;
    color: #fff;

    &:hover{
      color: #fff;
    }
  }

  .vue-notification-group{
    top: 20px !important;
    right: 20px !important;
  }


</style>
