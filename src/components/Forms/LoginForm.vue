
<template>
  <div class="shadow-lg rounded-lg bg-white px-8 md:px-20 py-10 overflow-hidden">
    <p class="get-s mb-4">Login</p>
    <div class="text-center mb-5" @click="$emit('switch')">
      Don't have an account?
      <a class="no-underline text-red" href="#">Register.</a>
    </div>

    <form @submit.prevent="login(form)">
      <input v-model.trim="form.username" type="email" placeholder="Email" />
      <input v-model.trim="form.password" type="password" placeholder="Password" />

      <div class="mt-12">
        <button type="submit" class="btn-red w-full">
          Login
          <i class="mdi mdi-chevron-right float-right"></i>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { loginUser } from '@/utils/authentications';
import { required, minLength, email } from 'vuelidate/lib/validators';
import { User } from '../../lib/api';
import { trace } from '../../lib/functions';

export default {
  name: 'LoginForm',
  mixins: [validationMixin],
  mounted() {
    if (this.isLoggedIn) this.$router.back();
  },
  data() {
    return {
      form: {
        username: 'gbrjnr@gmail.com',
        password: 'password',
      },
      steps: ['username', 'password'],
      currentStepNumber: 0,
      status: null,
      test: {
        username: 'micheal.angel@owonwo.33mail.com',
        password: 'password',
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
      username: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(8),
      },
    },
  },
  methods: {
    async login(credentials) {
      const check = async () => {
        const { data: payload } = await loginUser(credentials);
        const { data: profile } = await User.find(payload.id);

        return {
          data: {
            profile,
            token: payload.token,
          },
        };
      };

      this.$store
        .dispatch('auth/login', check())
        .then(() => this.$router.push('/'))
        .catch(trace('Login Error'));
    },
  },
};
</script>
