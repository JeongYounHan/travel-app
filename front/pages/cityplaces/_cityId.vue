<template>
    <div>
        <h1 class="places__header">{{this.placeList[0].city}}의 장소들</h1>
        <div class="places">
            <div v-for="(item, index) in placeList" :key="index">
                <v-card
                    class="places__card mx-auto my-2"
                    width="350"
                >
                    <v-img
                    :src="item.image"
                    height="200px"
                    ></v-img>

                    <v-card-title class="headline pb-0">{{item.name}}</v-card-title>
                    <v-subheader>
                        {{item.city}} | 
                        <span class="ml-1" v-if="item.div === 'transportation'">교통</span>
                        <span class="ml-1" v-else-if="item.div === 'accommodation'">숙소</span>
                        <span class="ml-1" v-else>관광명소</span>
                    </v-subheader>
                    <v-card-text class="font-weight-light">
                        {{item.description}}
                    </v-card-text>
                </v-card>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    head() {
        return {
            title: this.placeList[0].city
        };
    },
    async asyncData({ $axios, params }) {
        try {
            let temp = await $axios.$get(`http://localhost:8000/api/places?city=${params.cityId}`)
            let placeList = temp.results
            return { placeList }
        } catch (err) {
            return { placeList: [] }
        }
    },
    data() {
        return {
            cityId: '',
            show: false,
            placeList: [],
        }
    },
    created() {
    },      
    
}
</script>

<style>
.places {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
}

.places__header {
    text-align: center;
    margin: 30px 0;
}

@media screen and (max-width: 1100px) {
.places {
    display: grid;
    grid-template-columns: 1fr;
}
}

</style>