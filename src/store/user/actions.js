const actions = {
    updateName({ commit }, name) {
        commit('setName', name);
    },
    updateIsLogin({ commit }, isLogin) {
        commit('setIsLogin', isLogin);
    },
    updateUserData({ commit }, userData) {
        commit('setUserData', userData);
    }
};

export default actions;
