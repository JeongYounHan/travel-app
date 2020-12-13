export const state = () => ({
    trips: [{id: 1, city: '블라디보스톡', date_from: '2019.02.24', date_to: '2019.02.29', bg_image: 'https://t1.daumcdn.net/cfile/tistory/99697A3E5A4DEE1A0F'},
        {id: 2, city: '뉴욕', date_from: '2019.06.23', date_to: '2019.06.28', bg_image: 'https://athometrip.com/wp-content/uploads/2018/08/nighttour-800x533.jpg'},
        {id: 3, city: '방콕', date_from: '2019.09.12', date_to: '2019.09.19', bg_image: 'https://static.hubzum.zumst.com/hubzum/2017/08/09/10/e2920cdd61284acf943cd08cc0ee1c19.jpg'},
        {id: 4, city: '캄보디아', date_from: '2020.02.24', date_to: '2020.02.29', bg_image: 'https://www.asiatime.co.kr/news/data/20191016/p1065576702193158_814_thum.jpg'}            
    ],
    tripSelected: {},
    scheduleList: [{id: 1, trip: 1, day: 1, date: '2019.06.23', div: 'flight', time: 'ICN 19:05 - BKK 23:20', location: 1, order: 1, memo: '여행 시작!' },
        {id: 2, trip: 1, day: 1, date: '2019.06.23', div: 'sight', time: '', location: 2, order: 2, memo: '재밌겠다!' },
        {id: 3, trip: 1, day: 1, date: '2019.06.23', div: 'accommodation', time: '', location: 3, order: 3, memo: '' },
        {id: 4, trip: 1, day: 2, date: '2019.06.24', div: 'sight', time: '', location: 4, order: 4, memo: ''  },
        {id: 5, trip: 1, day: 2, date: '2019.06.24', div: 'sight', time: '', location: 5, order: 5, memo: ''  }
    ],
    cities: [],
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
    }
};

const BACK_URL = 'http://localhost:8000/api'

export const actions = {
    FETCH_CITYLIST({commit}) {
        this.$axios.get(`${BACK_URL}/cities`)
            .then((res) => {
                console.log(res)
                commit('SET_CITYLIST', res.data.results)
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
}
