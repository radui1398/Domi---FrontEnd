<template>
  <div>
    <div class="menu-panel align-items-center">
      <b-input
        v-model.trim="value.name"
        class="resource-title"
        :state="stateOf($v.value.name)"
        placeholder="Numele resursei.."/>

      <b-form-checkbox
        class="ml-5"
        v-model="value.usable"
        name="get" switch>
        Poate fi folosita?
      </b-form-checkbox>

      <b-btn
        size="sm"
        class="ml-auto"
        variant="primary"
        @click="save()">
        Salveaza
      </b-btn>
    </div>

    <b-form-group class="mt-4">
      <b-textarea
        v-model="value.description"
        class="description" max-rows="3"
        rows="2"
        placeholder="Descrierea resursei.."
        size="sm"/>
    </b-form-group>

    <b-row class="mt-4">
      <b-col md="3">
        <b-form-checkbox v-model="value.methods.get" name="get" switch>GET</b-form-checkbox>
      </b-col>
      <b-col md="3">
        <b-form-checkbox v-model="value.methods.put" name="put" switch>PUT</b-form-checkbox>
      </b-col>
      <b-col md="3">
        <b-form-checkbox v-model="value.methods.post" name="post" switch>POST</b-form-checkbox>
      </b-col>
      <b-col md="3">
        <b-form-checkbox v-model="value.methods.delete" name="delete" switch>DELETE</b-form-checkbox>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import validateMixins from "../../mixins/validate.mixins";
  import {ADD_RESOURCE, SAVE_RESOURCE} from "../../store/actions.type";

  export default {
    mixins: [validateMixins.resource],
    props: {
      value: {
        type: Object,
        required: true
      }
    },
    computed: {
      projectId() {
        return this.$route.query.project;
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
      save() {
        if (this.$v.value.name.$invalid) {
          this.$notify("Te rugam sa alegi un nume pentru aceasta resursa.");
          return false;
        }

        if (this.$v.value.structure.$invalid) {
          this.$notify("Te rugam sa completezi toate campurile de la proprietati.");
          return false;
        }

        if (this.value.structure.length === 0) {
          this.$notify("Resursa trebuie sa contina macar o proprietate");
          return false;
        }

        const projectId = this.$route.query.project;

        if (projectId) {
          this.value.project = projectId;

          this.$store.dispatch(ADD_RESOURCE, this.value);
          this.$router.push({name: 'viewProject', params: {id: projectId} });
        }else{
          this.$store.dispatch(SAVE_RESOURCE, this.value);
          this.$router.push({name: 'viewProject', params: {id: this.value.project} });
        }
      }
    }
  }
</script>
