<template>
  <div>
    <b-form-group class="form-title" :class="{ 'form-group--error': $v.value.name.$error }">
      <b-form-input type="text" class="v-input project-name" v-model.trim="value.name"
                    placeholder="Numele Proiectului..."></b-form-input>

      <small class="form-text text-muted" v-if="!$v.value.name.required">Alege un nume pentru proiect.</small>
      <small class="form-text text-muted" v-if="!$v.value.name.minLength">Lungimea minima a numelui este de 4
        caractere.</small>
      <small class="form-text text-muted" v-if="!$v.value.name.$invalid">Ai ales un nume perfect!</small>
    </b-form-group>

    <b-form-group class="mt-5" label="Descriere proiect">
      <b-form-input type="text" class="v-input" v-model="value.description"
                    placeholder="Acest camp este optional.."></b-form-input>
    </b-form-group>

    <b-row class="mt-5">
      <b-col md="6">
        <b-form-radio v-model="value.auth" value="jwt" name="authSystem" switch>Sistem de autentificare</b-form-radio>
      </b-col>
      <b-col md="6">
        <b-form-radio v-model="value.auth" value="key" name="useApiKey" switch>Accesare API prin cheie</b-form-radio>
      </b-col>
    </b-row>

    <b-form-group label="Cheia de acces" class="mt-5">
      <b-form-input type="text" class="v-input" placeholder='Scrie "random" pentru a genera o cheie...'
                    v-model.trim="value.key"></b-form-input>
    </b-form-group>
  </div>
</template>

<script>
  import {required, minLength} from 'vuelidate/lib/validators'
  import {mapGetters} from "vuex";

  export default {
    props: {
      value: {
        type: Object,
        required: true
      }
    },
    computed: {
      ...mapGetters(['currentUser']),
    },
    watch: {
      value: {
        handler(val) {
          if (val.key === "random") {
            const vueInstance = this;
            require('crypto').randomBytes(12, function (err, buffer) {
              vueInstance.value.key = buffer.toString('hex');
            });
          }

          if (this.$v.value.name.$invalid) {
            this.value.error = "Te rugam sa alegi un nume de proiect.";
          }else{
            this.value.error = null;
          }

          this.value.user = this.currentUser.uid;
          this.$emit('input', this.value);
        },
        deep: true
      },
    },
    validations: {
      value: {
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
