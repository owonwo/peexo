import Modal from '@/lib/components/Modal.vue'
import WgInput from '@/components/Forms/WgInput'
import Button from '@/components/Forms/Button.vue'

import Auth from './AuthMixin';
import Layout from './LayoutMixin';

export const AuthMixin = Auth
export const LayoutMixin = Layout

export const notForGuest = {
  beforeMount() {
    if (!this.isLoggedIn) {
      this.$router.back()
    }
  },
}

export const formMixin = {
  components: {
    WgInput,
    Button,
  },
}

export const modalMixin = {
  components: {
    Modal,
  },
}
