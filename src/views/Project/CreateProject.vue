<template>
  <div class="project h-100 mb-5">
    <b-container class="mt-5 h-100 d-flex flex-column">

      <v-project-form v-model="project"/>
      <b-button block variant="primary" class="mt-auto mb-5" @click="addProject">Adauga Proiect</b-button>

    </b-container>
  </div>
</template>

<script>
  import ProjectForm from "../../components/Project/ProjectForm";
  import {ADD_PROJECT} from "../../store/actions.type";
  import {mapGetters} from "vuex";

  export default {
    components: {
      "v-project-form": ProjectForm
    },
    data() {
      return {
        project: {
          name: '',
          description: '',
          auth: false,
          key: '',
          enabled: false
        }
      }
    },
    computed: {
      ...mapGetters(['currentUser'])
    },
    methods: {
      addProject(){
        if(this.project.error){
          this.$notify(this.project.error);
          return;
        }

        delete this.project['error'];

        this.project.user = this.currentUser.uid;
        this.$store.dispatch(ADD_PROJECT, this.project);
        this.$router.push({name: 'home'});
      }
    },
  }
</script>
