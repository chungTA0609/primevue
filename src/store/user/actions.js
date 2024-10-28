const actions = {
    updateName({ commit }, name) {
        commit('setName', name);
    },
    updateIsLogin({ commit }, isLogin) {
        commit('setIsLogin', isLogin);
    }
};

export default actions;
