<template>
  <b-card :title="resource.name">
    <b-card-text class="mb-0">
      {{ resource.description }}

      <div class="d-flex">

        <b-button :to="{name: 'editResource', params: {id: resource.id} }" size="sm"
                  block variant="primary" class="mt-2">Deschide</b-button>

        <b-button size="sm" variant="danger" block class="w-25 ml-3" @click="remove(resource.id)">
          <b-icon-trash-fill></b-icon-trash-fill>
        </b-button>

      </div>
    </b-card-text>
  </b-card>
</template>

<script>
  import {DELETE_RESOURCE} from "../../store/actions.type";

  export default {
    props: {
      resource: {
        type: Object,
        required: true
      }
    },
    methods: {
      remove(id) {
        this.$store.dispatch(DELETE_RESOURCE, id);
      }
    },
  }
</script>
