
<template>
  <div class="shadow-lg rounded-lg bg-white px-8 md:px-20 py-10 overflow-hidden">
    <p class="get-s mb-4">Register</p>
    <div class="text-center mb-5" @click="$emit('switch')">
      Already have an account?
      <a class="text-red no-underline" href="#">Login.</a>
    </div>

    <form class="mb-5">
      <transition-group name="custom-classes-transition" enter-active-class="animated bounceInLeft">
        <section :key="currentStepNumber" v-if="currentStepNumber === 0">
          <div>
            <input v-model="$v.form.user.first_name.$model" type="text" placeholder="First name">
            <span
              v-if="!$v.form.user.first_name.required && $v.form.user.first_name.$dirty"
            >First name is required</span>
            <span
              v-if="!$v.form.user.first_name.minLength && $v.form.user.first_name.$dirty"
            >First name must be at least {{$v.form.user.first_name.$params.minLength.min}} Letters</span>
          </div>
          <div>
            <input v-model="$v.form.user.last_name.$model" type="text" placeholder="Last name">
            <span
              v-if="!$v.form.user.last_name.required && $v.form.user.last_name.$dirty"
            >Last name is required</span>
            <span
              v-if="!$v.form.user.last_name.minLength && $v.form.user.last_name.$dirty"
            >Last name must be at least {{$v.form.user.last_name.$params.minLength.min}} Letters</span>
          </div>
          <div>
            <input v-model="$v.form.displayName.$model" type="text" placeholder="Display name">
            <span
              v-if="!$v.form.displayName.required && $v.form.displayName.$dirty"
            >Display Name is required</span>
            <span
              v-if="!$v.form.displayName.minLength"
            >Display name must be at least {{$v.form.displayName.$params.minLength.min}} letters</span>
          </div>
        </section>
        <section :key="currentStepNumber + 1" v-if="currentStepNumber === 1">
          <div>
            <input v-model="$v.form.user.email.$model" type="email" placeholder="Email">
            <span v-if="!$v.form.user.email.required && $v.form.user.email.$dirty">Email is required</span>
            <span v-if="!$v.form.user.email.email">Email must be valid</span>
          </div>
          <div>
            <input v-model="$v.form.user.password.$model" type="password" placeholder="Password">
            <span
              v-if="!$v.form.user.password.required && $v.form.user.password.$dirty"
            >Password is required.</span>
            <span
              v-if="!$v.form.user.password.minLength"
            >Password must be at least {{$v.form.user.password.$params.minLength.min}} letters.</span>
          </div>
          <div>
            <input
              v-model="$v.form.user.repeatPassword.$model"
              type="password"
              placeholder="Repeat password"
            >
            <span
              v-if="!$v.form.user.repeatPassword.sameAsPassword && $v.form.user.repeatPassword.$dirty"
            >Passwords must be identical.</span>
          </div>
        </section>
        <section :key="currentStepNumber + 2" v-if="currentStepNumber === 2">
          <div>
            <input v-model="$v.form.country.$model" type="text" placeholder="Country">
            <span v-if="!$v.form.countryrequired && $v.form.country$dirty">Country is required</span>
          </div>
          <div>
            <select type="text" placeholder="State">
              <option value="#" disabled>State</option>
              <option value="#">Some states</option>
            </select>
            <!-- <select type="text" placeholder="State">
              <option value="#" disabled>City</option>
              <option value="#">Cities in State</option>
            </select>-->
          </div>
        </section>
      </transition-group>
    </form>
    <button class="btn-red w-full" @click="submit">
      Continue <i class="mdi mdi-chevron-right float-right"></i>
    </button>
  </div>
</template>


<style lang="scss">
  form div {
    margin-bottom: 15px;

    > input {
      margin-bottom: 0 !important;

      & + span {
        font-size: smaller;
        font-style: italic;
        color: var(--primary-color);
      }
    }
  }
</style>

<script>
import axios from 'axios';
import { validationMixin } from 'vuelidate';
import {
  required, minLength, email, sameAs,
} from 'vuelidate/lib/validators';

export default {
  name: 'registerationForm',
  mixins: [validationMixin],
  data() {
    return {
      form: {
        country: null,
        photo: null,
        user: {
          email: null,
          password: null,
          repeatPassword: null,
          first_name: null,
          last_name: null,
        },
        displayName: null,
      },
      status: null,
      currentStepNumber: 0,
      steps: [
        ['first_name', 'last_name', 'displayName'],
        ['email', 'password', 'repeatPassword'],
        ['country'],
      ],
      test: {
        country: '/api/v1/country/1/',
        photo: null,
        user: {
          email: 'johndoe@gmail.com',
          password: 'guncontrol',
          first_name: 'John',
          last_name: 'Doe',
        },
        displayName: 'John Doe',
      },
    };
  },
  props: {
    message: {
      type: String,
      required: true,
    },
    error: {
      type: String,
      required: true,
    },
  },
  validations: {
    form: {
      country: {
        required,
      },
      // photo: {},
      user: {
        email: {
          required,
          email,
        },
        password: {
          required,
          minLength: minLength(8),
        },
        repeatPassword: {
          required,
          sameAsPassword: sameAs('password'),
        },
        first_name: {
          required,
          minLength: minLength(4),
        },
        last_name: {
          required,
          minLength: minLength(2),
        },
      },
      displayName: {
        required,
        minLength: minLength(6),
      },
    },
  },
  computed: {
    currentStep() {
      return this.steps[this.currentStepNumber];
    },
    isLastStep() {
      if (this.currentStepNumber !== this.steps.length - 1) return false;
      return true;
    },
    fields() {
      const flat = (array, value) => array.concat(value);
      const getProperties = (obj, value) => {
        const vForm = this.$v.form;
        obj[value] = vForm.hasOwnProperty(value)
          ? vForm[value]
          : vForm.user[value];

        return obj;
      };
      return this.steps.reduce(flat, []).reduce(getProperties, {});
    },
  },
  mounted() {
    this.getStates();
  },
  methods: {
    getStates() {
      // axios.setHeader({'accept-cross'})
      axios
        .get('https://api.touchabl.com/api/v1/country')
        .then(response => console.log(resonse))
        .catch(error => console.log(error));
    },
    goBack() {
      this.currentStepNumber--;
    },
    goNext() {
      this.currentStepNumber++;
    },
    submit() {
      for (const field_name of this.steps[this.currentStepNumber]) {
        const model = this.fields[field_name];
        if (model.$invalid) {
          model.$touch();
          return false;
        }
      }
      if (!this.isLastStep) this.goNext();
      else {
        delete this.form.user.repeatPassword;
        const data = JSON.stringify(this.form);

        return new Promise((resolve, reject) => {
          resolve(data);
          reject('error');
        });
      }
    },
  },
};
</script>
