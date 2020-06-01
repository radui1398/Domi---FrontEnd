<template>
  <p class="text-muted">
    <template v-if="project.auth === 'jwt'">
      <b-icon-shield-fill></b-icon-shield-fill>
      Acest proiect este protejat de un sistem de autentificare.
    </template>
    <template v-else-if="project.auth === 'key'">
      <b-icon-shield-fill></b-icon-shield-fill>
      Acest proiect este protejat printr-o cheie de acces: {{project.apiKey}}.
    </template>
    <template v-else>
      <b-icon-shield></b-icon-shield>
      Acest proiect poate fi interogat de catre oricine.
    </template>
  </p>
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
