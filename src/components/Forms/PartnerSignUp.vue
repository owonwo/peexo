
<template>
  <div>
    <div class="tbl-form-page">
      <div class="gt-strtd-cont">
        <section class="descrip">
          <img src="@/assets/images/logo-with-name2.png" alt="Touchabl logo">
          <p class="get-s">partner signup</p>
          <hr>
          <p v-if="currentStepNumber > 0">
            <br>
            <span class="text-red">Step {{currentStepNumber}}</span>
            of {{formSteps.length - 1}}: Create a Touchabl ID.
          </p>
        </section>
        <div>
          <!--  -->
          <component ref="currentStep" :is="currentStep"></component>
        </div>
        <div class="flex">
          <button v-if="currentStepNumber > 0" @click="goBack" class="btn-red">
            <i class="mdi mdi-chevron-left float-left"></i>
            <span>back</span>
          </button>
          <button @click.prevent="nextButtonAction" class="btn-red">
            <span>continue</span>
            <i class="mdi mdi-chevron-right float-right"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Agreement from './Partner/Agreement';
import BusinessInfo from './Partner/BusinessInfo';
import UserInfo from './Partner/UserInfo';

export default {
  components: {
    Agreement,
    BusinessInfo,
    UserInfo,
  },
  data: () => ({
    currentStepNumber: 0,
    formSteps: ['Agreement', 'BusinessInfo', 'UserInfo'],
    form: {
      business: {},
      personal: {},
    },
    message: null,
    error: null,
  }),
  computed: {
    currentStep() {
      return this.formSteps[this.currentStepNumber];
    },
    isLastStep() {
      if (this.currentStepNumber !== this.formSteps.length - 1) return false;
      return true;
    },
  },
  methods: {
    goBack() {
      this.currentStepNumber--;
    },
    goNext() {
      this.currentStepNumber++;
    },
    async nextButtonAction() {
      if (!this.$refs.currentStep.hasOwnProperty('submit')) return this.goNext();
      try {
        const response = await this.$refs.currentStep.submit();
        console.log(response);
        if (response) {
          if (!this.isLastStep) {
            Object.assign(this.form.business, response);
            return this.goNext();
          }
          Object.assign(this.form.personal, response);
          this.postToServer()
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    async postToServer() {
      const _data = JSON.stringify(this.form)
      console.log(_data)
    },
  },
};
</script>

<style scoped>
.btn {
  display: inline-block;
  color: #fff;
  background-color: #e72253;
  padding: 0.75rem 1.5rem;
  text-decoration: none;
  border-radius: 0.25rem;
  text-transform: uppercase;
  font-weight: 500;
  font-size: 0.875rem;
  border: 1px solid transparent;
  letter-spacing: 0.2;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
}
.flex {
  display: flex;
  justify-content: space-between;
}
</style>
