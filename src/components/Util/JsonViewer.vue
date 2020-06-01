<template>
  <v-json-editor v-model="structure" :options="editorOptions" :plus="false" height="400px"
                 @error="onError" />
</template>

<script>
  import VJsonEditor from "v-jsoneditor";

  export default {
    props: {
      structure: {
        type: Array,
        required: true
      }
    },
    components:{
      "v-json-editor": VJsonEditor
    },
    data(){
      return{
        editorOptions: {
          mode: 'view'
        }
      }
    },
    methods: {
      onError(){

      }
    }
  }
</script>
