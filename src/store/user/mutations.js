const mutations = {
    setName(state, name) {
        state.name = name;
    },
    setIsLogin(state, isLogin) {
        state.isLogin = isLogin;
    },
    setUserData(state, userData) {
        state.userData = userData;
    }
};

export default mutations;
