<template>
  <div>
    <b-container class="mt-5 project-info">
      <h1>
        {{ project.name }}
        <b-button variant="link" :to="{name: 'editProject'}">
          <b-icon-gear-fill font-scale="1"></b-icon-gear-fill>
        </b-button>
      </h1>
      <p class="text-muted">{{ project.description }}</p>
    </b-container>

    <b-container>
      <p class="text-muted" style="margin-top: 100px;">
        <template v-if="project.authSystem">
          <b-icon-shield-fill></b-icon-shield-fill>
          Acest proiect este protejat de un sistem de autentificare rulat pe: {{project.userDefinition}}.
        </template>
        <template v-else-if="project.useApiKey">
          <b-icon-shield-fill></b-icon-shield-fill>
          Acest proiect este protejat printr-o cheie de acces: {{project.apiKey}}.
        </template>
        <template v-else>
          <b-icon-shield></b-icon-shield>
          Acest proiect poate fi interogat de catre oricine.
        </template>
      </p>

      <div class="menu-panel">
        <b-btn size="sm" variant="primary" :to="{name: 'createResource', params: {id: $route.params.id}}">Resursa noua
        </b-btn>
      </div>

      <div class="text-center mt-5" v-show="loading">
        <b-spinner type="grow" label="Loading..."></b-spinner>
      </div>

      <b-row>
        <b-col md="4" class="mt-4" v-show="project.authSystem && !loading">
          <b-card :title="project.userDefinition" class="mb-0 h-100">
            Aceasta resursa protejeaza proiectul.
          </b-card>
        </b-col>
        <b-col md="4" class="mt-4 h-100" v-for="resource in resources" :key="resource.id">

          <b-card :title="resource.name">
            <b-card-text class="mb-0">
              {{ resource.description }}
              <div class="d-flex">
                <b-button :to="{name: 'editResource', params: {id: resource.id} }" size="sm"
                          block variant="primary" class="mt-2">
                  Deschide
                </b-button>

                <b-button size="sm" variant="danger" block class="w-25 ml-3" @click="deleteResource(resource.id)">
                  <b-icon-trash-fill></b-icon-trash-fill>
                </b-button>
              </div>
            </b-card-text>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        loading: true,
        copyResources: null
      }
    },
    computed: {
      project: {
        get() {
          const projectId = this.$store.getters.params.id;
          return this.$store.getters.project(projectId);
        }
      },
      resources() {
        return this.$store.getters.resources
      }
    },
    methods: {
      deleteResource(id) {
        this.$store.dispatch('deleteResource', id);
      }
    },
    created() {
      const projectId = this.$store.getters.params.id;

      this.$store.dispatch('bindResourcesRef', projectId).then(() => {
        this.loading = false;
      });
    }
  }
</script>

<style scoped lang="scss">
  .project-info {
    h1 {
      display: flex;
      align-items: flex-start;

      a {
        padding: 0;
        margin-left: 10px;
        display: none;
      }
    }

    &:hover {
      h1 a {
        display: inline;
      }
    }
  }

  .card-body {
    input {
      border: none;
      padding: 0;
      box-shadow: none;
      outline: none;

      &.card-title {
        font-size: 25px;
        width: 100%;
      }

      &.card-text {
        width: 100%;
      }
    }

    .custom-switch {
      margin-bottom: 5px;

      label {
        letter-spacing: 1px;
        color: #6c757d;
      }
    }
  }

  .card {
    &.selected {
      box-shadow: 0 0 0 0.2rem rgba(38, 143, 255, 0.5);
    }
  }

  #trash {
    .col-md-4 {
      display: none;
    }
  }
</style>
