// store/index.js
import { createStore } from 'vuex';
import user from './user';
import car from './car';
import createPersistedState from 'vuex-persistedstate';
const store = createStore({
    modules: {
        user,
        car
    },
    plugins: [createPersistedState()]
});

export default store;
