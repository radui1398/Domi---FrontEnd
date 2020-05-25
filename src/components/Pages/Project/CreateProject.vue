<template>
  <div>
    <b-container class="mt-5">

      <b-form-group class="form-title" :class="{ 'form-group--error': $v.project.name.$error }">
        <b-form-input type="text" class="v-input project-name" v-model.trim="project.name" placeholder="Numele Proiectului..."></b-form-input>

        <small class="form-text text-muted" v-if="!$v.project.name.required">Alege un nume pentru proiect.</small>
        <small class="form-text text-muted" v-if="!$v.project.name.minLength">Lungimea minima a numelui este de 4 caractere.</small>
        <small class="form-text text-muted" v-if="!$v.project.name.$invalid">Ai ales un nume perfect!</small>
      </b-form-group>

      <b-form-group class="mt-5" label="Descriere proiect">
        <b-form-input type="text" class="v-input" v-model="project.description" placeholder="Acest camp este optional.."></b-form-input>
      </b-form-group>

      <b-row class="mt-5">
        <b-col md="6">
          <b-form-checkbox v-model="project.authSystem" name="authSystem" switch>Sistem de autentificare</b-form-checkbox>
        </b-col>
        <b-col md="6">
          <b-form-checkbox v-model="project.useApiKey" name="useApiKey" switch>Accesare API prin cheie</b-form-checkbox>
        </b-col>
      </b-row>

      <b-form-group label="Nume entitate" class="mt-5" v-if="project.authSystem">
        <b-form-input type="text" class="v-input" v-model.trim="project.userDefinition"></b-form-input>

        <small class="form-text text-muted" v-if="!$v.project.userDefinition.required">Alege un nume pentru entitatea ce va fi folosita pentru autentificare.</small>
        <small class="form-text text-muted" v-if="!$v.project.userDefinition.$invalid">{{ project.userDefinition }} pare a fi un nume bun.</small>
      </b-form-group>

      <b-form-group label="Cheia de acces" class="mt-5" v-if="project.useApiKey">
        <b-form-input type="text" class="v-input" placeholder='Scrie "random" pentru a genera o cheie...' v-model.trim="project.apiKey"></b-form-input>
      </b-form-group>

      <b-button block variant="primary" class="mt-auto mb-5" @click="addProject">Adauga Proiect</b-button>

    </b-container>
  </div>
</template>

<script>
  import { required, minLength, between } from 'vuelidate/lib/validators'

  export default {
    data(){
      return{
        project: {
          name: '',
          description: '',
          authSystem: false,
          userDefinition: 'User',
          useApiKey: false,
          apiKey: '',
          user: this.$store.getters.currentUser.uid,
          enabled: false
        }
      }
    },
    computed: {
      apiKey(){
        return this.project.apiKey;
      }
    },
    watch: {
      apiKey(value){
        if(value === "random"){
          const vueInstance = this;
          require('crypto').randomBytes(12, function(err, buffer) {
            vueInstance.project.apiKey = buffer.toString('hex');
          });
        }
      }
    },
    methods: {
      addProject(){
        if(this.$v.project.name.$invalid){
          this.$notify("Te rugam sa alegi un nume de proiect.")
          return false;
        }

        if(this.$v.project.userDefinition.$invalid){
          this.project.userDefinition = "User"
        }

        this.$store.dispatch('addProject', this.project);
        this.$router.push({name: 'home'});
      }
    },
    validations: {
      project: {
        name: {
          required,
          minLength: minLength(4)
        },
        userDefinition: {
          required,
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .form-group--error{
    display: none;
  }

  .v-input{
    height: auto;
    border: none;
    outline: none;
    box-shadow: none;
    padding-left: 1px;
    border-bottom: 1px solid #1b2735;
    border-radius: 2px;
  }

  .form-title{
    margin-bottom: 50px;
    input {
      width: 100%;
    }
  }

  .project-name{
    font-size: 32px;
    line-height: 36px;
    border-bottom: none;
  }

  .container{
    height: 100%;
    display: flex;
    flex-direction: column;
  }
</style>
