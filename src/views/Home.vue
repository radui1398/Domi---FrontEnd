<template>
  <div>
    <v-jumbotron></v-jumbotron>
    <v-projects></v-projects>
  </div>
</template>

<script>
  import Jumbotron from "../components/Structure/Jumbotron";
  import ProjectList from "../components/Project/ProjectList";

  export default {
    data() {
      return {}
    },
    components: {
      "v-jumbotron": Jumbotron,
      "v-projects": ProjectList,
    }
  }
</script>
