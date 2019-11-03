
<template>
  <section class="form">
    <form>
      <transition-group name="custom-classes-transition" enter-active-class="animated bounceInLeft">
        <section :key="currentStepNumber" v-if="currentStepNumber === 0">
          <div>
            <input v-model="$v.form.first_name.$model" type="text" placeholder="First name">
            <span
              v-if="!$v.form.first_name.required && $v.form.first_name.$dirty"
            >First name is required</span>
            <span
              v-if="!$v.form.first_name.minLength && $v.form.first_name.$dirty"
            >First name must be at least {{$v.form.first_name.$params.minLength.min}} Letters</span>
          </div>
          <div>
            <input v-model="$v.form.last_name.$model" type="text" placeholder="Last name">
            <span
              v-if="!$v.form.last_name.required && $v.form.last_name.$dirty"
            >Last name is required</span>
            <span
              v-if="!$v.form.last_name.minLength && $v.form.last_name.$dirty"
            >Last name must be at least {{$v.form.last_name.$params.minLength.min}} Letters</span>
          </div>
        </section>
        <section :key="currentStepNumber + 1" v-if="currentStepNumber === 1">
          <div>
            <input
              v-model="$v.form.email.$model"
              type="email"
              placeholder="Email (Not Business Email)"
            >
            <span v-if="!$v.form.email.required && $v.form.email.$dirty">Email is required</span>
            <span v-if="!$v.form.email.email">Email must be valid</span>
          </div>
          <div>
            <input v-model="$v.form.password.$model" type="password" placeholder="Password">
            <span v-if="!$v.form.password.required && $v.form.password.$dirty">Password is required.</span>
            <span
              v-if="!$v.form.password.minLength"
            >Password must be at least {{$v.form.password.$params.minLength.min}} letters.</span>
          </div>
          <div>
            <input
              v-model="$v.form.repeatPassword.$model"
              type="password"
              placeholder="Repeat password"
            >
            <span
              v-if="!$v.form.repeatPassword.sameAsPassword && $v.form.repeatPassword.$dirty"
            >Passwords must be identical.</span>
          </div>
        </section>
        <section :key="currentStepNumber + 2" v-if="currentStepNumber === 2">
          <div>
            <select v-model="$v.form.country.$model" type="text" placeholder="Country">
              <option value="0" disabled selected>Country</option>
              <option value="1">Nigeria</option>
              <option value="2">Niger</option>
              <option value="3">Canada</option>
            </select>
            <span v-if="!$v.form.countryrequired && $v.form.country$dirty">Country is required</span>
          </div>
        </section>
      </transition-group>
    </form>
  </section>
</template>

<style scoped>
span {
  text-align: right;
  color: #eb4b73;
  margin: 0px 0px 20px 0px;
}
</style>

<script>
import axios from 'axios';
import { validationMixin } from 'vuelidate';
import {
  required, minLength, email, sameAs,
} from 'vuelidate/lib/validators';

export default {
  name: 'userinfo',
  mixins: [validationMixin],
  data() {
    return {
      form: {
        country: null,
        email: null,
        password: null,
        repeatPassword: null,
        first_name: null,
        last_name: null,
      },
      status: null,
      currentStepNumber: 0,
      steps: [
        ['first_name', 'last_name'],
        ['email', 'password', 'repeatPassword'],
        ['country'],
      ],
      test: {
        country: '/api/v1/country/1/',
        email: 'johndoe@gmail.com',
        password: 'guncontrol',
        first_name: 'John',
        last_name: 'Doe',
      },
    };
  },
  validations: {
    form: {
      country: {
        required,
      },
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
        obj[value] = this.$v.form[value];

        return obj;
      };
      return this.steps.reduce(flat, []).reduce(getProperties, {});
    },
  },
  methods: {
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
      if (!this.isLastStep) {
        this.goNext();
        return false
      }
      delete this.form.repeatPassword;

      return new Promise((resolve, reject) => {
        resolve(this.form);
        reject('error');
      });
    },
  },
};
</script>
