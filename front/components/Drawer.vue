<template>
  <div class="drawer">
    <v-navigation-drawer permanent>
      <h1>{{ tripSelected.date_from }} - {{ tripSelected.date_to }}</h1>
      <p>{{ tripSelected.city }} 여행</p>
      <div class="chips">
        <v-chip>+ 항공편</v-chip>
        <v-chip>+ 숙소</v-chip>
      </div>
      <v-divider></v-divider>
      <div v-if="scheduleList">
        <ScheduleList v-for="day in days" :key="day" :day="day" />
      </div>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapState } from 'vuex'
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
      scheduleList: state => state.trips.scheduleList
    })
  },
  mounted() {
    this.calcDays(this.tripSelected)
  },
  updated() {

  },
  methods: {
    calcDays(tripSelected) {
      const from = tripSelected.date_from
      const to = tripSelected.date_to
      const ar1 = from.split('.')
      const ar2 = to.split('.')
      const da1 = new Date(ar1[0], ar1[1], ar1[2])
      const da2 = new Date(ar2[0], ar2[1], ar2[2])
      const dif = da2 - da1
      const cDay = 24 * 60 * 60 * 1000 // 시 * 분 * 초 * 밀리세컨

      this.days = dif / cDay + 1
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
  margin: 20px 0;
}
</style>
