const actions = {
    fetchProducts({ commit }) {
        // Simulate fetching cars
        commit('setProducts', ['Product 1', 'Product 2']);
    }
};

export default actions;
