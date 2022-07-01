import { createStore, createLogger } from 'vuex';
import user from './modules/User';

const debug = process.env.NODE_ENV !== 'production'

const Store = createStore({
  modules: {
    user
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})

export default Store;