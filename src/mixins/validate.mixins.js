import {alphaNum, email, minLength, required} from "vuelidate/lib/validators";
import {validationMixin} from "vuelidate";

const validateMethod = {
  validationMixin,
  methods: {
    stateOf(field) {
      const {$invalid} = field;
      return !$invalid;
    }
  },
};

export default {
  login: {
    ...validateMethod,
    validations: {
      email: {
        required,
        minLength: minLength(4),
        email
      },
      password: {
        required,
        minLength: minLength(6)
      }
    }
  },
  resource: {
    ...validateMethod,
    validations: {
      value: {
        name: {
          required,
          minLength: minLength(4),
          alphaNum
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
    },
  }
}
