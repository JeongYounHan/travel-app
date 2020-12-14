<template>
    <div class="dialog__container">
        <v-dialog
            v-model="dialog"
            persistent
            max-width="600px"
        >
            <template v-slot:activator="{ on, attrs }">
            <v-btn
                class="dialog__btn"
                color="teal"
                dark
                fab
                small
                v-bind="attrs"
                v-on="on"
            >
                +
            </v-btn>
            </template>
            <v-card>
            <v-card-title>
                <h1 class="ml-2 mt-2">여행을 떠나볼까요?</h1>
            </v-card-title>
            <v-card-text>
                <v-container class="pt-0" v-if="citiesName">
                    <v-text-field
                        v-model="name"
                        label="여행의 이름을 정해주세요."
                    ></v-text-field>
                    <v-select
                        :items="citiesName"
                        label="여행하는 도시는 어디인가요?"
                        v-model="city"
                        required
                    ></v-select>
                    <br />
                    <h2>날짜 정하기</h2>
                    <div class="date__container">
                        <v-date-picker
                            v-model="date1"
                            show-current="2020-12-14"
                            width="250"
                        ></v-date-picker>
                        <v-date-picker
                            v-model="date2"
                            show-current="2020-12-14"
                            width="250"
                        ></v-date-picker>
                    </div>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                outlined
                text
                @click.prevent="dialog = false"
                >
                Close
                </v-btn>
                <v-btn
                outlined
                text
                @click.prevent="onSubmit"
                >
                Save
                </v-btn>
            </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import Datetime from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'
import {mapState, mapActions} from 'vuex'

export default {
    data() {
        return {
            dialog: false,
            name: '',
            city: '',
            date1: '',
            date2: '',

        }
    },
    computed: {
        ...mapState({
            cities: state => state.trips.cities
        }),
        citiesName() {
            let name = []
            this.cities.forEach(item => {
                name.push(item.name)
            })
            return name
        }
    },
    mounted() {
        // this.changeCityIntoName()
    },
    methods: {
        ...mapActions({
            ADD_TRIP: 'trips/ADD_TRIP',
        }),
        onSubmit() {
            this.ADD_TRIP({
                city: this.city,
                name: this.name,
                date_from: this.date1,
                date_to: this.date2
            })
            this.dialog = false
        },
        // changeCityIntoName() {
        //     const name = []
        //     this.cities.forEach(item => {
        //         name.push(item.name)
        //     })
        //     this.citiesName = name
        // }
    }
}
</script>
<style>
.dialog__container {
    position: fixed;
    bottom: 15px;
    right: 15px;
}

.date__container {
    display: flex;
    justify-content: space-between;
}
</style>