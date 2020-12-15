export const state = () => ({
    placeList: [],
    cities: [],
    trips: [],
    tripSelected: {},
    scheduleList: [],
    daySelected: {},
    daysTotal: 0,
    daySchedule: [],
});

export const mutations = {
    SET_CITYLIST(state, payload){
        state.cities = payload;
    },
    SELECT_TRIP(state, payload){
        state.tripSelected = payload;
    },
    SET_TRIPLIST(state, payload) {
        state.trips = payload
    },
    SET_SCHEDULELIST(state, payload){
        state.scheduleList = payload
    },
    SET_DAY(state, payload) {
        state.daySelected = payload
    },    
    SET_PLACE(state, payload) {
        state.placeList = payload
    },     
    SET_DAYSTOTAL(state, payload) {
        state.daysTotal = payload
    },
    SET_DAYSCHEDULE(state, payload) {
        state.daySchedule = payload
    },
};

const BACK_URL = 'http://localhost:8000/api'

export const actions = {
    FETCH_CITYLIST({commit}) {
        this.$axios.get(`${BACK_URL}/cities`)
            .then((res) => {
                commit('SET_CITYLIST', res.data.results)
            }).catch((err) => {
                console.log(err)
            })
    },
    FETCH_PLACELIST({commit}) {
        this.$axios.get(`${BACK_URL}/places`)
            .then((res) => {
                commit('SET_PLACE', res.data.results)
            }).catch((err) => {
                console.log(err)
            })
    },
    FETCH_TRIPLIST({commit, rootState}) {
        const config = {
            headers: {
                Authorization: 'Token ' + rootState.users.token
            }
        }
        this.$axios.get(`${BACK_URL}/trips`, config)
            .then((res) => {
                commit('SET_TRIPLIST', res.data)
            }).catch((err) => {
                console.log(err)
            })
    },
    ADD_TRIP({dispatch, rootState}, payload) {
        const config = {
            headers: {
                Authorization: 'Token ' + rootState.users.token
            }
        }
        this.$axios.post(`${BACK_URL}/trips`, {
            city: payload.city,
            name: payload.name,
            date_from: payload.date_from,
            date_to: payload.date_to
        }, config)
            .then(() => {
                dispatch('FETCH_TRIPLIST')
            }).catch((err) => {
                console.log(err)
            })
    },
    FETCH_SCHEDULELIST({commit, rootState}, payload) {
        const config = {
            headers: {
                Authorization: 'Token ' + rootState.users.token
            }
        }
        this.$axios.get(`${BACK_URL}/schedules?trip=${payload.trip}`, config)
            .then((res) => {
                commit('SET_SCHEDULELIST', res.data)
            }).catch((err) => {
                console.log(err)
            })
    },
    ADD_SCHEDULE({dispatch, rootState}, payload) {
        const config = {
            headers: {
                Authorization: 'Token ' + rootState.users.token
            }
        }
        this.$axios.post(`${BACK_URL}/schedules`, {
            trip: payload.trip,
            place: payload.place,
            day: payload.day,
            order: payload.order,
            memo: payload.memo,
        }, config)
            .then((res) => {
                dispatch('FETCH_SCHEDULELIST', {trip: res.data.trip.id})
                dispatch('FETCH_DAYSCHEDULE', {trip: res.data.trip.id, day: payload.day})
            }).catch((err) => {
                console.log(err)
            })
    },
    UPDATE_SCHEDULE({dispatch, rootState}, payload) {
        console.log(payload)
        const config = {
            headers: {
                Authorization: 'Token ' + rootState.users.token
            }
        }
        this.$axios.put(`${BACK_URL}/schedules/${payload.id}`, {
            day: payload.day,
            order: payload.order,
        }, config)
            .then((res) => {
                dispatch('FETCH_SCHEDULELIST', {trip: res.data.trip.id})
            }).catch((err) => {
                console.log(err)
            })
    },
    FETCH_DAYSCHEDULE({commit, rootState}, payload) {
        const config = {
            headers: {
                Authorization: 'Token ' + rootState.users.token
            }
        }

        const day = payload.day || ''
        return this.$axios.get(`${BACK_URL}/schedules?trip=${payload.trip}&day=${day}`, config)
            .then((res) => {
                console.log(res.data)
                commit('SET_DAYSCHEDULE', res.data)
            }).catch((err) => {
                console.log(err)
            })
    },
}
