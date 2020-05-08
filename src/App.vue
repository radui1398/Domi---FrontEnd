<template>
  <div id="app">
    <r-auth></r-auth>
  </div>
</template>

<script>
  import Auth from './components/Auth/Auth';

  export default {
    components: {
      rAuth: Auth,
    }
  }

</script>

<style lang="scss">
  body,html{
    min-height: 100%;
    max-height: 100%;
    height: 100%;
  }

  body{
    margin: 0;
    font-family: "Lato", sans-serif;

    display: flex;
    flex-direction: column;

    #app{
      height: 100%;
      overflow: hidden;
    }
  }

  .btn-black{
    background-color: #000 !important;
    color: #fff;

    &:hover{
      color: #fff;
    }
  }


</style>
