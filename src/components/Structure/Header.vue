<template>
    <b-navbar toggleable="lg" type="light" variant="light">
          <b-container>
            <b-navbar-brand to="/" href="#">{{appName}}</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>


            <b-collapse id="nav-collapse" is-nav>
              <v-menu></v-menu>
            </b-collapse>
          </b-container>
    </b-navbar>
</template>

<script>
  import Menu from './Menu';

  export default {
    data(){
      return {
        appName: "Domi"
      }
    },
    components: {
      "v-menu": Menu
    }
  }
</script>
