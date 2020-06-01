<template>
  <div>
    <v-drag-trash v-show="dragging" group="attr" />

    <v-draggable
      class="resource-list mb-3"
      group="attr"
      v-model="value.structure"
      draggable=".resource-item"
      @start="dragging = true"
      @end="dragging = false">

      <div class="resource-item" v-for="(item, index) in value.structure">
        <div class="resource-attr">

          <b-form-group label="Nume:" label-size="sm">
            <b-input
              :state="stateOf($v.value.structure.$each[index].name)"
              v-model="item.name"
              type="text"
              placeholder="Nume.."/>
          </b-form-group>

          <b-form-group label="Tip:" label-size="sm" class="mt-3 mb-0">
            <v-prop-type-select
              v-model="item.type"
              :state="stateOf($v.value.structure.$each[index].type)" />
          </b-form-group>

        </div>
      </div>

      <div class="resource-footer" slot="footer">
        <div class="resource-attr new-attr" @click="add">
          <b-icon-plus font-scale="8"></b-icon-plus>
        </div>
      </div>
    </v-draggable>
  </div>
</template>

<script>
  import Draggable from 'vuedraggable'
  import DragTrash from "../Util/DragTrash";
  import PropTypeSelect from "./PropTypeSelect";
  import validateMixins from "../../mixins/validate.mixins";

  export default{
    mixins: [validateMixins.resource],
    props: {
      value: {
        type: Object,
        required: true
      }
    },
    components: {
      "v-drag-trash": DragTrash,
      "v-draggable": Draggable,
      "v-prop-type-select": PropTypeSelect
    },
    data(){
      return{
        dragging: false
      }
    },
    watch: {
      value: {
        handler(val) {
          this.$emit('input', this.value);
        },
        deep: true
      },
    },
    methods: {
      add(){
        this.value.structure.push({
          name: '',
          type: null
        })
      }
    },
  }
</script>
