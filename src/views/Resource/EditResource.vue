<template>
  <b-container class="create-resource">
    <v-resource-header v-model="selected" class="mt-5" />

    <hr class="mt-5">

    <v-props v-model="selected" />

    <v-json-viewer :structure="selected.structure"/>

  </b-container>
</template>

<script>
  import ResourceHeader from "../../components/Resource/ResourceHeader";
  import ResourceProps from "../../components/Resource/ResourceProps";
  import JsonViewer from "../../components/Util/JsonViewer";
  import {mapGetters} from "vuex";
  import {BIND_RESOURCES} from "../../store/actions.type";

  export default {
    components: {
      "v-resource-header": ResourceHeader,
      "v-props": ResourceProps,
      "v-json-viewer": JsonViewer
    },
    computed: {
      ...mapGetters(['resource']),
      selected: {
        get() {
          return this.resource(this.resourceId)
        },
        set() {
          return true;
        }
      },
      resourceId(){
        return this.$route.params.id;
      }
    }
  }
</script>
