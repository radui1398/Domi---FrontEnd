<template>
  <div class="view-project">
    <v-project-header :project="selected" class="mt-5" />

    <b-container>
      <v-project-auth :project="selected" style="margin-top: 100px;" />

      <div class="menu-panel">
        <b-btn size="sm" variant="primary" :to="{name: 'createResource', query: {project: projectId} }">Resursa noua
        </b-btn>
      </div>

      <b-row>
        <b-col md="4" class="mt-4" v-show="selected.auth === 'jwt'">
          <b-card title="User" class="mb-0 h-100">
            Aceasta resursa protejeaza proiectul.
          </b-card>
        </b-col>

        <b-col md="4" class="mt-4 h-100" v-for="resource in selectedResources" :key="resource.id">
          <v-resource-card :resource="resource" />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>

  import {mapGetters} from "vuex";
  import ResourceCard from "../../components/Resource/ResourceCard";
  import ProjectAuth from "../../components/Project/ProjectAuth";
  import ProjectHeader from "../../components/Project/ProjectHeader";

  export default {
    components: {
      "v-resource-card": ResourceCard,
      "v-project-auth": ProjectAuth,
      "v-project-header": ProjectHeader
    },
    data() {
      return {
        copyResources: null
      }
    },
    computed: {
      ...mapGetters(['project','resources']),
      selected: {
        get() {
          return this.project(this.projectId)
        },
        set() {
          return true;
        }
      },
      selectedResources(){
        return this.resources(this.projectId);
      },
      projectId(){
        return this.$route.params.id;
      }
    }
  }
</script>

<style>

</style>
