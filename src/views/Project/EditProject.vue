<template>
  <div class="project h-100 mb-5">
    <b-container class="mt-5 h-100 d-flex flex-column">

      <v-project-form v-model="selected"/>
      <b-button block variant="primary" class="mt-auto mb-5" @click="saveProject">Salveaza Proiect</b-button>

    </b-container>
  </div>
</template>

<script>
  import ProjectForm from "../../components/Project/ProjectForm";
  import {SAVE_PROJECT} from "../../store/actions.type";
  import {mapGetters} from "vuex";

  export default {
    components: {
      "v-project-form": ProjectForm
    },
    computed: {
      ...mapGetters(['currentUser','project']),
      selected: {
        get() {
          return this.project(this.projectId)
        },
        set() {
          return true;
        }
      },
      projectId(){
        return this.$route.params.id;
      }
    },
    methods: {
      saveProject(){
        if(this.project.error){
          this.$notify(this.project.error);
          return;
        }

        delete this.project['error'];

        this.$store.dispatch(SAVE_PROJECT, this.project);
      }
    },
  }
</script>
