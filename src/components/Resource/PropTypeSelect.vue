<template>
  <v-model-select :options="types"
                :class="'select-valid-' + state"
                v-model="bucket"
                placeholder="Selecteaza" />
</template>

<script>
  import { ModelSelect } from 'vue-search-select'
  import validateMixins from "../../mixins/validate.mixins";

  export default {
    mixins: [validateMixins.resource],
    props: {
      value: {
        required: true
      },
      state: {
        type: Boolean,
        required: true
      }
    },
    components: {
      "v-model-select": ModelSelect
    },
    data(){
      return {
        bucket: null,
        types: [
          {
            text: "Nume",
            value: "name"
          }
        ]
      }
    },
    watch: {
      bucket(){
        this.$emit('input', this.bucket);
      }
    },
    mounted(){
      this.bucket = this.value;
    }
  }
</script>
