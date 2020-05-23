<template>
  <b-container>
    <div class="menu-panel mt-5 align-items-center">
      <b-input v-model="resource.name" class="resource-title" :state="validateState($v.resource.name)"placeholder="Numele resursei.."></b-input>

      <b-form-checkbox class="ml-5" v-model="resource.usable" name="get" switch>Poate fi folosita?</b-form-checkbox>

      <b-btn size="sm" class="ml-auto" variant="primary" @click="saveResource()">
        Salveaza
      </b-btn>
    </div>

    <b-form-group class="mt-4">
      <b-textarea v-model="resource.description" class="description" max-rows="3" rows="2" placeholder="Descrierea resursei.." size="sm"></b-textarea>
    </b-form-group>

    <b-row class="mt-4">
      <b-col md="3">
        <b-form-checkbox v-model="resource.methods.get" name="get" switch>GET</b-form-checkbox>
      </b-col>
      <b-col md="3">
        <b-form-checkbox v-model="resource.methods.put" name="put" switch>PUT</b-form-checkbox>
      </b-col>
      <b-col md="3">
        <b-form-checkbox v-model="resource.methods.post" name="post" switch>POST</b-form-checkbox>
      </b-col>
      <b-col md="3">
        <b-form-checkbox v-model="resource.methods.delete" name="delete" switch>DELETE</b-form-checkbox>
      </b-col>
    </b-row>

    <hr class="mt-5">

    <drag-trash v-show="dragging" group="attr"></drag-trash>

    <draggable class="resource-list mb-3" group="attr" v-model="resource.structure" draggable=".resource-item" @start="dragging = true" @end="dragging = false"  >
      <div class="resource-item" v-for="(item, index) in resource.structure">
        <div class="resource-attr">
          <b-form-group label="Nume:" label-size="sm">
            <b-input :state="validateState($v.resource.structure.$each[index].name)"  v-model="item.name" type="text" placeholder="Nume.."></b-input>
          </b-form-group>

          <b-form-group label="Tip:" label-size="sm" class="mt-3 mb-0">
            <model-select :options="types"
                          :class="'select-valid-'+validateState($v.resource.structure.$each[index].type)"
                          v-model="item.type"
                          placeholder="Selecteaza">
            </model-select>
          </b-form-group>


        </div>
      </div>

      <div class="resource-footer" slot="footer">
        <div class="resource-attr new-attr" @click="addResourceAttr">
          <b-icon-plus font-scale="8"></b-icon-plus>
        </div>
      </div>
    </draggable>

    <v-json-editor v-model="resource.structure" :options="editorOptions" :plus="false" height="400px"
                   @error="onError"></v-json-editor>

  </b-container>
</template>

<script>
  import VJsonEditor from 'v-jsoneditor'
  import Draggable from 'vuedraggable'
  import { ModelSelect } from 'vue-search-select'
  import { validationMixin } from "vuelidate";
  import { required, minLength, between } from 'vuelidate/lib/validators'

  import DragTrash from "../Parts/DragTrash";

  export default {
    validationMixin,
    data() {
      return {
        editorOptions: {
          mode: 'view'
        },
        dragging: false,
        types: [
          {value: 'first_name', text: 'Nume'},
          {value: 'last_name', text: 'Prenume'},
          {value: 'number', text: 'Numar'},
          {value: 'address', text: 'Adresa'},
        ],
      }
    },
    components: {
      VJsonEditor,
      Draggable,
      ModelSelect,
      DragTrash
    },
    computed: {
      resource(){
        const resourceId = this.$store.getters.params.id;
        return this.$store.getters.resource(resourceId);
      }
    },
    methods: {
      onError() {
        console.log('error')
      },
      saveResource(){
        if(this.$v.resource.name.$invalid){
          this.$notify("Te rugam sa alegi un nume pentru aceasta resursa.");
          return false;
        }

        if(this.$v.resource.structure.$invalid){
          this.$notify("Te rugam sa completezi toate campurile de la proprietati.");
          return false;
        }

        if(this.resource.structure.length === 0){
          this.$notify("Resursa trebuie sa contina macar o proprietate");
          return false;
        }

        // const projectId = this.$route.params.id;
        //
        // this.$store.commit('addResource', {projectId, resource: this.resource});
        // this.$router.push({name: 'viewProject', params: {id: projectId}})
      },
      addResourceAttr() {
        this.resource.structure.push({
          name: '',
          type: null
        })
      },
      validateState(field) {
        const { $invalid } = field;
        return !$invalid;
      },
    },
    validations: {
      resource: {
        name: {
          required,
          minLength: minLength(4)
        },
        structure: {
          $each: {
            name: {
              required,
              minLength: minLength(3)
            },
            type: {
              required
            }
          }
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .resource-title {
    width: 20%;
    border: none;
    box-shadow: none;
  }

  .resource-attr {
    background-color: #f6f6f6;
    padding: 10px;
    border-radius: 5px;
  }

  .new-attr {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: white;

    &:hover {
      background-color: #f3f3f3;
    }
  }

  .resource-list {
    display: flex;
    margin: 0 -15px;
    flex-wrap: wrap;

    .resource-item, .resource-footer {
      width: calc(20% - 30px);
      margin: 10px 15px;
    }
  }

  .form-control{
    border: none;
  }

  .select-valid-false{
    border-color: rgba(220, 53, 69, 0.20) !important;
  }

  .description{
    border: 3px solid #f2f2f2;
    box-shadow: none;
  }


  #trash{
    .resource-item{
      display: none;
    }
  }
</style>
