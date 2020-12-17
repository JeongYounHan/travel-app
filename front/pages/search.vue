<template>
  <div class="search">
    <div class="search__container">
      <input
        class="search__form"
        placeholder="검색"
        v-model="keyword"
      />
      <button @click="onClickSearch">SEARCH</button>
    </div>
    <v-container>
        <div v-if="cities.length > 0">
            <v-subheader>
                검색 결과
            </v-subheader>
            <br>
            <div v-for="(item, index) in cities" :key="index">
                <v-card flat class="cityList__container" nuxt :to="'/cityplaces/' + item.id">
                    <v-avatar>
                        <v-img :src="item.image"></v-img>
                    </v-avatar>
                    <div class="cityList__words">
                        <p class="cityList__name">{{item.name}}</p>
                        <small>{{item.country}} | {{item.continent}}</small>
                    </div>
                </v-card>
            </div>
        </div>
        <div v-else>
            <v-subheader>
                검색 결과가 없습니다.
            </v-subheader>
        </div>
    </v-container>
    <v-container three-line class="cityList">
        <v-divider></v-divider>
        <v-subheader>
            전체 도시 목록
        </v-subheader>
        <br>
        <div v-for="(item, index) in cityList" :key="index">
            <v-card flat class="cityList__container" nuxt :to="'/cityplaces/' + item.id">
                <v-avatar>
                    <v-img :src="item.image"></v-img>
                </v-avatar>
                <div class="cityList__words">
                    <p class="cityList__name">{{item.name}}</p>
                    <small>{{item.country}} | {{item.continent}}</small>
                </div>
            </v-card>
        </div>
    </v-container>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    head() {
        return {
            title: "전체 여행지 목록"
        };
    },
    async asyncData({ $axios }) {
        try {
            let temp = await $axios.$get(`http://localhost:8000/api/cities`)
            let cityList = temp.results
            return { cityList }
        } catch (err) {
            return { cityList: [] }
        }
    },
    computed: {
        ...mapState({
            cities: state => state.trips.cities,
        })
    },
    data() {
        return {
            keyword: '',
        }
    },
    methods: {
        ...mapActions({
            FETCH_CITYLIST: 'trips/FETCH_CITYLIST'
        }),
        onClickSearch() {
            const keyword = this.keyword.trim()
            if (keyword) {
                this.FETCH_CITYLIST({keyword: keyword})
                this.$router.push({ path: 'search', query: { search: keyword }})
            }
        },
    }
}
</script>

<style scoped>
.search__container{
    text-align: center;
    margin-top: 50px;
}

.search__form {
    width: 60%;
    background-color: #ffffff;
    display: inline;
    margin-bottom: 12px;
    padding: 6.5px 8px;
    transition: all 0.3s;
    outline: 1px solid rgb(199, 199, 199);
}

.search__form:focus {
    background: rgb(229, 240, 239);
    outline: none;
}

button {
    background-color: rgb(13, 160, 160);
    color: white;
    padding: 7px 5px;
    display: inline;
}

button:focus {
    outline: none;
}

.cityList__container {
    display: flex;
    margin-bottom: 15px; 
}

.cityList__words {
    margin-left: 20px;
}

.cityList__name {
    padding: 0px;
    margin: 3px 0 2px;
}

</style>