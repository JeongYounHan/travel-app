<template>
  <div class="addSchedule">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
        flat
          class="addSchedule__btn"
          v-bind="attrs"
          v-on="on"
        >
          할일 추가
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <h1>할일 추가</h1>
        </v-card-title>
        <v-card-text>
          <v-container class="pt-0">
            <v-text-field
                label="간단한 메모를 적으셔도 됩니다."
                v-model="memo"
            ></v-text-field>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
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
import {mapState, mapActions} from 'vuex'

export default {
    props: ['dayEach', 'daySchedule'],
    data() {
        return {
            dialog: false,
            place: '',
            memo: '',
        }
    },
    computed: {
        ...mapState({
            daySelected: state => state.trips.daySelected,
            tripSelected: state => state.trips.tripSelected.id,
            placeList: state => state.trips.placeList
        }),
    },
    created() {
        // this.changePlaceIntoName()
    },
    methods: {
        ...mapActions({
            ADD_SCHEDULE: 'trips/ADD_SCHEDULE'
        }),
        // changePlaceIntoName() {
        //     const name = []
        //     this.placeList.forEach(item => {
        //         name.push(item.name)
        //     })
        //     this.placesName = name
        // },
        async onSubmit() {
            const order = await this.calcMaxOrder()
            this.ADD_SCHEDULE({trip: this.tripSelected, place: this.place, day: this.dayEach, order: order, memo: this.memo})
            this.dialog = false
        },
    },
}
</script>
<style>
.addSchedule {
    display: inline;
}

</style>

