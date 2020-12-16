import axios from 'axios'


export const state = () => ({
    me: null,
    token: null,
});

export const setAuthInHeader = token => {
    axios.defaults.headers.common['Authorization'] = token ? `Token ${token}` : null
};

export const mutations = {
    LOGIN(state, token) {
        if (!token) return
        state.me = 'yes'
        state.token = token
        setAuthInHeader(token)
    },
    LOGOUT(state) {
        state.token = null
        state.me = null
        setAuthInHeader(null)
    },
};

const BACK_URL = 'http://localhost:8000/rest-auth'

export const actions = {
    nuxtServerInit ({ commit }, { app }) {
        const token = app.$cookies.get('token')
        console.log(token)
        commit('LOGIN', token)
    },
    LOGIN({ commit }, payload) {
        this.$axios.post(`${BACK_URL}/login/`, {
            username: payload.username,
            password: payload.password,
        })
            .then((res) => {
                commit('LOGIN', res.data.key)
                // localStorage.setItem('token', res.data.key)
                this.$cookies.set('token', res.data.key)
                this.$router.push('/')
            }).catch((err) => {
                console.log(err)
            })
    },    
    SIGNUP({ dispatch }, payload) {
        this.$axios.post(`${BACK_URL}/signup/`, {
            username: payload.username,
            email: payload.email,
            password1: payload.password1,
            password2: payload.password2,
        })
            .then(() => {
                // 백 문제로 에러가 나고 있음
            }).catch((err) => {
                console.log(err)
            }).finally(() => {
                dispatch('LOGIN', {username: payload.username, password: payload.password1})
            })
    }, 
    LOGOUT({commit}) {
        this.$axios.post(`${BACK_URL}/logout/`)
            .then(() => {
                commit('LOGOUT', null)
                this.$router.push('/login')
            }).catch((err) => {
                console.error(err);
            });
    } 
};



