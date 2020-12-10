import axios from 'axios'

export const state = () => ({
    me: null,
    token: null,
});

export const setAuthInHeader = token => {
    axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : null
}

export const mutations = {
    // 임시
    SET_ME(state, payload) {
        state.me = payload;
    },
    LOGIN(state, token) {
        if (!token) return
        state.token = token
        localStorage.setItem('token', token)
        setAuthInHeader(token)
    },
    LOGOUT(state) {
        state.me = null
        state.token = null
        delete localStorage.token
        setAuthInHeader(null)
    },
};