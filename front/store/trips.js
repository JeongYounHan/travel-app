export const state = () => ({
    trips: [{id: 1, city: '블라디보스톡', date_from: '2019-02-24', date_to: '2019-02-29', bg_image: 'https://t1.daumcdn.net/cfile/tistory/99697A3E5A4DEE1A0F'},
    {id: 2, city: '뉴욕', date_from: '2019-06-23', date_to: '2019-06-28', bg_image: 'https://athometrip.com/wp-content/uploads/2018/08/nighttour-800x533.jpg'},
    {id: 3, city: '방콕', date_from: '2019-09-12', date_to: '2019-09-19', bg_image: 'https://static.hubzum.zumst.com/hubzum/2017/08/09/10/e2920cdd61284acf943cd08cc0ee1c19.jpg'},
    {id: 4, city: '캄보디아', date_from: '2020-02-24', date_to: '2020-02-29', bg_image: 'https://www.asiatime.co.kr/news/data/20191016/p1065576702193158_814_thum.jpg'}            
],
});

export const mutations = {
    addMainPost(state, payload) {
        state.trips.unshift(payload);
    },
};