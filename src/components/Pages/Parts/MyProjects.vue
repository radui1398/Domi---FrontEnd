<template>
  <b-container class="mt-4">
    <h3>Proiectele tale:</h3>

    <b-button class="add-project-caller" v-show="!projects.length" :to="{name: 'createProject'}">
      <b-icon-plus></b-icon-plus>
    </b-button>

    <b-row>
      <b-col class="mb-4" sm="6" v-for="project in projects" :key="project.id">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{project.name}}</h5>
            <p class="card-text">{{project.description}}</p>
            <b-button variant="primary" :to="{name: 'viewProject', params: {id: project.id}}">
              Deschide
            </b-button>
            <b-button variant="secondary" :to="{name: 'editProject', params: {id: project.id}}">
              <b-icon-gear-fill></b-icon-gear-fill>
            </b-button>
            <b-button variant="danger" @click="deleteProject(project.id)">
              <b-icon-x-octagon-fill></b-icon-x-octagon-fill>
            </b-button>
          </div>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  computed: {
    projects() {
      return this.$store.getters.projects;
    }
  },
  methods: {
    deleteProject(id){
      this.$store.dispatch('deleteProject', id);
    }
  }
}
</script>

<style lang="scss" scoped>
  .add-project-caller{
    height: 100px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 56px;
    background-color: rgba(0, 123, 255, 0.70);
    border: none;
    box-shadow: none;
    outline: none;

    &:hover{
      background-color: #007bff;
    }
  }
</style>
