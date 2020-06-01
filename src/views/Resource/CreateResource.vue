<template>
  <b-container class="create-resource">
    <v-resource-header v-model="resource" class="mt-5" />

    <hr class="mt-5">

    <v-props v-model="resource" />

    <v-json-viewer :structure="resource.structure"/>

  </b-container>
</template>

<script>
  import ResourceHeader from "../../components/Resource/ResourceHeader";
  import ResourceProps from "../../components/Resource/ResourceProps";
  import JsonViewer from "../../components/Util/JsonViewer";

  export default {
    components: {
      "v-resource-header": ResourceHeader,
      "v-props": ResourceProps,
      "v-json-viewer": JsonViewer
    },
    data() {
      return {
        resource: {
          name: '',
          structure: [],
          description: '',
          usable: false,
          methods: {
            get: false,
            post: false,
            put: false,
            delete: false
          }
        }
      }
    }
  }
</script>
