<template>
  <b-container class="project-info">
    <h1>
      {{ project.name }}
      <b-button variant="link" :to="{name: 'editProject'}">
        <b-icon-gear-fill font-scale="1"></b-icon-gear-fill>
      </b-button>
    </h1>
    <p class="text-muted">{{ project.description }}</p>
  </b-container>
</template>

<script>
  export default{
    props: {
      project: {
        type: Object,
        required: true
      }
    }
  }
</script>
