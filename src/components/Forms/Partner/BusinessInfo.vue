
<template>
  <section class="form">
    <form>
      <transition-group name="custom-classes-transition" enter-active-class="animated bounceInLeft">
        <section :key="currentStepNumber" v-if="currentStepNumber === 0">
          <div>
            <input
              v-model="$v.form.name.$model"
              type="text"
              placeholder="Name of Business or brand"
            >
            <span v-if="!$v.form.name.required && $v.form.name.$dirty">Name is required</span>
          </div>
          <div>
            <select v-model="$v.form.category.$model">
              <option value="#" selected disabled>Category of business</option>
              <option value="1">Fastion Retailer</option>
              <option value="2">Fashion Designer</option>
              <option value="3">Model</option>
              <option value="4">MUA</option>
              <option value="5">Stylist</option>
              <option value="6">Fashion Photography</option>
              <option value="7">Stocklist</option>
              <option value="8">Boutique</option>
            </select>
            <span
              v-if="!$v.form.category.required && $v.form.category.$dirty"
            >Please let us know which category your business fall under.</span>
          </div>
        </section>
        <section :key="currentStepNumber" v-if="currentStepNumber === 1">
          <div>
            <input v-model="$v.form.email.$model" type="email" placeholder="Business Email">
            <span v-if="!$v.form.email.required && $v.form.email.$dirty">Email is required.</span>
            <span v-if="!$v.form.email.email">Email must be valid.</span>
          </div>
          <div>
            <input v-model="$v.form.password.$model" type="Password" placeholder="Password">
            <span v-if="!$v.form.password.required && $v.form.password.$dirty">Password is required</span>
            <span
              v-if="!$v.form.password.minLength"
            >Password must at least be {{$v.form.password.$params.minLength.min}} letters.</span>
          </div>
          <div>
            <input
              v-model="$v.form.repeatPassword.$model"
              type="Password"
              placeholder="Password again"
            >
            <span v-if="!$v.form.repeatPassword.sameAsPassword">Password does not match</span>
          </div>
        </section>
        <section :key="currentStepNumber" v-if="currentStepNumber === 2">
          <div>
            <input v-model="$v.form.tel.$model" type="number" placeholder="Business Telephone Line">
            <span
              v-if="!$v.form.tel.required && $v.form.tel.$dirty"
            >Business Telephone line is required.</span>
          </div>
          <div>
            <input
              v-model="$v.form.address.$model"
              type="text"
              placeholder="Business Address (Optional)"
            >
          </div>
        </section>
        <section :key="currentStepNumber" v-if="currentStepNumber === 3">
          <div>
            <select v-model="$v.form.country.$model" name="country">
              <option value="0" disabled selected>Country</option>
              <option value="1">Nigeria</option>
              <option value="2">Niger</option>
              <option value="3">Canada</option>
            </select>
            <span v-if="!$v.form.country.required && $v.form.country.$dirty">Country is required.</span>
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
        name: null,
        category: null,
        email: null,
        password: null,
        repeatPassword: null,
        tel: null,
        address: null,
        country: null,
      },
      status: null,
      currentStepNumber: 0,
      steps: [
        ['name', 'category'],
        ['email', 'password', 'repeatPassword'],
        ['tel', 'address'],
        ['country'],
      ],
    };
  },
  validations: {
    form: {
      name: {
        required,
      },
      category: {
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
      tel: {
        required,
      },
      address: {
        required,
      },
      country: {
        required,
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
        return false;
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
