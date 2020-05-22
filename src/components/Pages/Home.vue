<template>
  <div>
    <v-jumbotron></v-jumbotron>
    <v-projects></v-projects>
  </div>
</template>

<script>
  import Jumbotron from './Parts/Jumbotron';
  import MyProjects from './Parts/MyProjects';

  export default {
    components:{
      vJumbotron: Jumbotron,
      vProjects: MyProjects
    }
  }
</script>

<style>

</style>
