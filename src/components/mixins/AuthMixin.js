import {
  mapGetters,
} from 'vuex';
import helpers from '../../lib/helpers';

export default {
  computed: {
    ...mapGetters('auth', [
      'authUser',
      'auth_errors',
      'isLoggedIn',
      'isGuest',
      'isAdmin',
    ]),
  },
  methods: {
    logout() {
      helpers.destroyToken()
    },
  },
}
