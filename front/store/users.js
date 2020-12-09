export const state = () => ({
    me: {},
});


export const mutations = {
    SET_ME(state, payload) {
        state.me = payload;
    }
};