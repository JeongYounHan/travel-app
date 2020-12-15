<template>
  <div class="drawer">
    <v-navigation-drawer permanent>
      <h1>{{ tripSelected.date_from }} - {{ tripSelected.date_to }}</h1>
      <h3 class="my-0">{{ tripSelected.city.name }} 여행</h3>
      <small>{{ tripSelected.city.country }} | {{ tripSelected.city.continent }}</small>
      <div class="chips mt-3">
        <v-chip>+ 항공편</v-chip>
        <v-chip>+ 숙소</v-chip>
      </div>
      <v-divider></v-divider>
      <div v-if="scheduleList">
        <ScheduleList :ref="`day${day}`" v-for="day in days" :key="day" :day="day" class="mb-5"/>
      </div>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import ScheduleList from '../components/ScheduleList'


export default {
  components: {
    ScheduleList
  },
  data() {
    return {
      days: 0
    }
  },
  computed: {
    ...mapState({
      tripSelected: state => state.trips.tripSelected,
      scheduleList: state => state.trips.scheduleList,
      dayScroll: state => state.trips.dayScroll,
    })
  },
  created() {
    this.FETCH_SCHEDULELIST({trip: this.tripSelected.id})
    this.calcDays(this.tripSelected)
  },
  mounted() {

  },
  watch: {
    dayScroll() {
      console.log(this.$refs[`day${this.dayScroll}`][0])
      this.$refs[`day${this.dayScroll}`][0].$el.scrollIntoView({behavior: "smooth", inline: "nearest"})
    }
  },
  methods: {
    ...mapMutations({
      SET_DAYSTOTAL: 'trips/SET_DAYSTOTAL'
    }),
    ...mapActions({
      FETCH_SCHEDULELIST: 'trips/FETCH_SCHEDULELIST'
    }),
    calcDays(tripSelected) {
      const from = tripSelected.date_from
      const to = tripSelected.date_to
      const ar1 = from.split('-')
      const ar2 = to.split('-')
      const da1 = new Date(ar1[0], ar1[1], ar1[2])
      const da2 = new Date(ar2[0], ar2[1], ar2[2])
      const dif = da2 - da1
      const cDay = 24 * 60 * 60 * 1000 // 시 * 분 * 초 * 밀리세컨
      
      this.days = dif / cDay + 1
      this.SET_DAYSTOTAL(this.days)
    },
  }
}
</script>

<style>
.drawer {
  height: calc(100vh - 49px);
  width: 300px;
  position: fixed;
  z-index: 1;
  /* 스크롤 없애기 위해 */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
/* 스크롤 없애기 위해 */
.drawer ::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera*/
}

.v-navigation-drawer {
  padding: 10px;
}

.v-navigation-drawer__border {
  width: 0px;
}

.v-divider {
  margin: 15px 0;
}
</style>
